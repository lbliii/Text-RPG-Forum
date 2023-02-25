<script>
	import { supabase } from '../supabase.js';
	import {
		Chevron,
		Dropdown,
		DropdownItem,
		DropdownDivider,
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger
	} from 'flowbite-svelte';
	import { UserCircle, RectangleStack } from 'svelte-heros-v2';


	export let user;

	const logout = () => {
		supabase.auth.signOut();
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
		<NavLi id="auth-menu" class="cursor-pointer"> {#if user}<UserCircle/>{/if}</NavLi>

		{#if user}
			<Dropdown color="green" triggeredBy="#auth-menu" class="">
				<DropdownItem class="hover:bg-white" href="/user/{user.user_id}">View Profile</DropdownItem>
				<DropdownDivider />
				<DropdownItem href="/" on:click={logout}>Sign Out</DropdownItem>
			</Dropdown>
		{/if}
	</NavUl>
</Navbar>
