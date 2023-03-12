<script>
	import { supabase } from '../supabase.js';
	import { Card, P, Button, Modal }  from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	export let modalOpen = false;
	export let modalTitle = 'Log In';
	let loading = false;
	let email;

	const handleLogin = async () => {
		loading = true;

		try {
			const { error } = await supabase.auth.signInWithOtp({ email });
			if (error) throw error;
			alert('Check your email for the login link!');
		} catch (error) {
			alert(`Error: ${error.message || error.error_description}`);
		} finally {
			loading = false;
			goto('/forums')
		}
	};
</script>

<Modal bind:open={modalOpen} title={modalTitle} on:close={() => modalOpen = false}>

	<h1 class="text-2xl font-bold text-center md:text-3xl">Log In</h1>

	<P class="text-center my-4">Sign in via magic link with your email below. No passwords needed!</P>

	<form on:submit|preventDefault={handleLogin}>
	<div class="flex flex-col text-sm mb-2">
		<label class="font-bold mb-2 " for="email">Email</label>
		<input
			class="appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg"
			name="email"
			type="email"
			placeholder="email@address.com"
			bind:value={email}
		/>
	</div>
	<Button
		color="green" class="w-full shadow-sm rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
		type="submit">Log In</Button
	>
</form>

</Modal>

