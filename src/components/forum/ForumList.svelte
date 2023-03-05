<script>
	import { forumsStore } from '../../stores/forumsStore.js';
	import { fade } from 'svelte/transition';
	import Forum from './Forum.svelte';

	export let user;

	let searchTerm = '';
	let filteredForums = $forumsStore

	forumsStore.fetchForums()

	$: {
		$forumsStore
		
		if (searchTerm) {
			filteredForums = $forumsStore.filter((forum) => {
				return forum.title.toLowerCase().includes(searchTerm.toLowerCase());
			});
		} else {
			filteredForums = $forumsStore;
		}
	}
</script>

<div class="flex justify-end items-center my-2 space-x-3">
	<slot> </slot>
	<input
		type="text"
		placeholder="Search forums"
		bind:value={searchTerm}
		class="border border-gray-400 rounded-md p-2 w-full md:w-1/3"
	/>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 grid-flow-row-dense">
	{#if filteredForums.length > 0}
		{#each filteredForums as forum}
			<div in:fade="{{ duration: 1100 }}" class="flex self-stretch">
				<Forum forum={forum} user={user} />
			</div>
			
		{/each}
	{/if}
</div>

