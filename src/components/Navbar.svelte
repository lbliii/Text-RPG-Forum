<script>
  import { supabase } from '../supabase.js';
  import { Chevron, Dropdown, DropdownItem, DropdownDivider, Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte'
  import { userStore } from '../stores/userStore.js';

  export let auth 

  const logout = () => {
    supabase.auth.signOut();
  };
 </script>


<Navbar color="gray" class="rounded" let:hidden let:toggle>
  <NavBrand href="/">
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      Emdash
    </span>
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi href="/users">Users</NavLi>
    <NavLi href="/forums">Forums</NavLi>
    <NavLi id="auth-menu" class="cursor-pointer"><Chevron aligned>{#if $userStore}{$userStore.alias}{/if}</Chevron></NavLi>

    {#if auth}
    <Dropdown color="green" triggeredBy="#auth-menu" class="" >
      <DropdownItem class="hover:bg-white" href="/user/{auth.id}">View Profile</DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/" on:click={logout}>Sign Out</DropdownItem>
    </Dropdown>
    {/if}

  </NavUl>
</Navbar>