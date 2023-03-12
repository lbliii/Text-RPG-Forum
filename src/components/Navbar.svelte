<script>
	import { supabase } from '../supabase.js';
	import { Dropdown, DropdownItem, DropdownDivider, Navbar, NavBrand, NavLi, NavUl, NavHamburger, Chevron, Badge
	} from 'flowbite-svelte';
	import { UserCircle } from 'svelte-heros-v2';
	import { authStore } from '../stores/authStore.js';
	import { userStore } from '../stores/userStore.js';
	import Auth from '../components/Auth.svelte';

	export let user = {};
	let modalOpen = false;

	$: if (user) {
		userStore.fetchUser(user)
		}

	const logout = () => {
		supabase.auth.signOut();
		// clear the auth and user store 
		authStore.set(null);

	};

	const openAuthModal = () => {
		modalOpen = true;
	}

</script>

<Navbar let:hidden let:toggle>
  <NavBrand href="/">
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Emdash</span> <Badge class="ml-1">Alpha</Badge>
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi href="/forums">Forums</NavLi>
    <NavLi href="/users">Users</NavLi>
    <NavLi id="nav-menu1" class="cursor-pointer"><Chevron aligned><UserCircle/></Chevron></NavLi>
    <Dropdown triggeredBy="#nav-menu1" class="w-44 z-20">
	  {#if $userStore.user_id }
		<DropdownItem href="/user/{$userStore.user_id}">View Profile</DropdownItem>
		<DropdownDivider />
		<DropdownItem on:click={logout}>Sign out</DropdownItem>
	  {:else }
	  	<DropdownItem on:click={openAuthModal} > Sign in</DropdownItem>
	  {/if}
    </Dropdown>
  </NavUl>
</Navbar>

<Auth modalOpen={modalOpen}  />
