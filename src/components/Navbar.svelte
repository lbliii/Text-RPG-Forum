 <script>
   import { supabase } from '../supabase.js';
     import { Navbar, NavBrand, NavHamburger, NavUl, NavLi} from 'flowbite-svelte'


   const logout = () => {
      supabase.auth.signOut();
   }

 </script>

 

<Navbar let:hidden let:toggle>
  <NavBrand href="/">
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Emdash</span>
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi href="/">Home</NavLi>
    <NavLi href="/" on:click={logout}>Log Out</NavLi>
  </NavUl>
</Navbar>

