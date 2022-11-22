 <script>
   import { supabase } from '../supabase.js';
   import { Chevron, Dropdown, DropdownItem, DropdownDivider, Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte'
   import {account} from '../stores/accountStore.js'

   let profile = $account.id

   const logout = () => {
      supabase.auth.signOut();
   }

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
    <Dropdown color="green"  triggeredBy="#account-menu" class="w-44 z-20">
      <DropdownItem class="hover:bg-white" href="/user/{profile}">View Profile</DropdownItem>
      <DropdownItem class="hover:bg-white" href="/character/create">Create a Character</DropdownItem>
      <DropdownItem class="hover:bg-white" href="/characters">View Your Characters</DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/" on:click={logout}>Sign Out</DropdownItem>
    </Dropdown>
  </NavUl>
</Navbar>
