 <script>
   import { supabase } from '../supabase.js';
   import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Input } from 'flowbite-svelte'

   const logout = () => {
      supabase.auth.signOut();
   }

 </script>


<Navbar let:hidden let:toggle>
  <NavBrand href="/">
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      Emdash
    </span>
  </NavBrand>
  <div class="flex md:order-2">
    <Button size="sm" on:click={logout}>log out</Button>
    <NavHamburger on:click={toggle} />
  </div>
  <NavUl {hidden} class="order-1">
    <NavLi href="/" active={true}>Home</NavLi>
  </NavUl>
</Navbar>

