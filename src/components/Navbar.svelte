<script>
	import { supabase } from '../supabase.js';
	import {
		Dropdown,
		DropdownItem,
		DropdownDivider,
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger
	} from 'flowbite-svelte';
	import { UserCircle } from 'svelte-heros-v2';
	import { authStore } from '../stores/authStore.js';
	import { goto } from '$app/navigation'

	export let user;

	const logout = () => {
		supabase.auth.signOut();
		// clear the auth and user store 
		authStore.set(null);
		goto('/');
	};

</script>

<Navbar color="light"  let:hidden let:toggle rounded>
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			Emdash
		</span>
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl {hidden}>
		<NavLi href="/users">Users</NavLi>
		<NavLi href="/forums">Forums</NavLi>
		<NavLi id="auth-menu" class="cursor-pointer"> {#if user}<UserCircle color="{user.admin ? 'red' : 'black'} "/>{/if}</NavLi>
	</NavUl>
</Navbar>

{#if user}
	<Dropdown color="green" triggeredBy="#auth-menu" class="">
		<DropdownItem class="hover:bg-white" href="/user/{$authStore.id}">View Profile</DropdownItem>
		<DropdownDivider />
		<DropdownItem href="/" on:click={logout}>Sign Out</DropdownItem>
	</Dropdown>
{/if}