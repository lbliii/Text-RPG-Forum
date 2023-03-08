<script>
	import { supabase } from '../supabase.js';
	import { Dropdown, DropdownItem, DropdownDivider, Navbar, NavBrand, NavLi, NavUl, NavHamburger, Chevron
	} from 'flowbite-svelte';
	import { UserCircle } from 'svelte-heros-v2';
	import { authStore } from '../stores/authStore.js';
	import { userStore } from '../stores/userStore.js';

	export let user = {};

	$: if (user) {
		userStore.fetchUser(user)
		}

	const logout = () => {
		supabase.auth.signOut();
		// clear the auth and user store 
		authStore.set(null);

	};

</script>

<Navbar let:hidden let:toggle>
  <NavBrand href="/">
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Emdash</span>
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi href="/forums">Forums</NavLi>
    <NavLi href="/users">Users</NavLi>
    <NavLi id="nav-menu1" class="cursor-pointer"><Chevron aligned><UserCircle/></Chevron></NavLi>
    <Dropdown triggeredBy="#nav-menu1" class="w-44 z-20">
      <DropdownItem href="/user/{$userStore.user_id}">View Profile</DropdownItem>
      <DropdownDivider />
      <DropdownItem on:click={logout}>Sign out</DropdownItem>
    </Dropdown>
  </NavUl>
</Navbar>