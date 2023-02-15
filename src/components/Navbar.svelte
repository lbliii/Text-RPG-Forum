<script>
  import { supabase } from '../supabase.js';
  import { Chevron, Dropdown, DropdownItem, DropdownDivider, Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte'

  export let account 

  const logout = () => {
    supabase.auth.signOut();
  };
 </script>


<Navbar color="green" class="rounded" let:hidden let:toggle>
  <NavBrand href="/">
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      Emdash
    </span>
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi href="/users">Users</NavLi>
    <NavLi href="/topics">Topics</NavLi>
    <NavLi id="account-menu" class="cursor-pointer"><Chevron aligned>Profile</Chevron></NavLi>

    {#if account}
    <Dropdown color="green" triggeredBy="#account-menu" class="" >
      <DropdownItem class="hover:bg-white" href="/user/{account.id}">View Profile</DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/" on:click={logout}>Sign Out</DropdownItem>
    </Dropdown>
    {/if}

  </NavUl>
</Navbar>