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
    <Button outline={true} size="xs" color="green" class="mr-2" href="/character/create">Create Character</Button>
    <Button outline={true} size="xs" color="blue" class="mr-2" href="/character/create">Create Thread</Button>
    <Button outline={true} size="xs" color="dark" on:click={logout}>log out</Button>
    <NavHamburger on:click={toggle} />
  </div>
  <NavUl {hidden} class="order-1">
    <NavLi href="/characters" active={false}>Characters</NavLi>
    <!-- <NavLi href="/threads" active={false}>Threads</NavLi> -->
  </NavUl>
</Navbar>

