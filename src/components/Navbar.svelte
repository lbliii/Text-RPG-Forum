 <script>
   import { supabase } from '../supabase.js';
     import { Navbar, NavBrand, NavHamburger, NavUl, NavLi, Chevron, MegaMenu } from 'flowbite-svelte'
  let menu = [
    {name: 'About us', href: '/about'},
    {name: 'Blog', href: '/blog'},
    {name: 'Contact us', href: '/contact'},
    {name: 'Library', href: '/library'},
    {name: 'Newsletter', href: '/news'},
    {name: 'Support Center', href: '/support'},
    {name: 'Resources', href: '/resource'},
    {name: 'Playground', href: '/play'},
    {name: 'Terms', href: '/terms'},
    {name: 'Pro Version', href: '/pro'},
    {name: 'License', href: '/license'},
  ];

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
    <NavLi><Chevron aligned>Mega menu</Chevron></NavLi>
    <MegaMenu items={menu} let:item>
      <a href={item.href} class="hover:text-blue-600 dark:hover:text-blue-500">{item.name}</a>
    </MegaMenu>
    <NavLi href="/" on:click={logout}>Log Out</NavLi>
  </NavUl>
</Navbar>

