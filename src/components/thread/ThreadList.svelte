<script>
	import { forumStore } from '../../stores/forumStore.js';
	import { threadsStore } from '../../stores/threadsStore.js';
	import { Button, ButtonGroup } from 'flowbite-svelte';
	import { BarsArrowDown, BarsArrowUp } from 'svelte-heros-v2';
	import Thread from '../thread/Thread.svelte';

	export let forum = $forumStore;

	let sortAscending = true;
	let filteredThreads = $threadsStore;
	let searchTerm = '';

	threadsStore.fetchForumThreads(forum.id)


	$: {
		
		$threadsStore

		if (searchTerm) {
			filteredThreads = $threadsStore.filter((thread) => {
				return thread.title.toLowerCase().includes(searchTerm.toLowerCase());
			});
		} else {
			filteredThreads = $threadsStore;
		}

	}

	function toggleSort() {
		sortAscending = !sortAscending;
	}
</script>


<div class="flex flex-row justify-end my-2 space-x-3">
	<input
		type="text"
		placeholder="Search threads"
		bind:value={searchTerm}
		class="border border-gray-400 rounded-md p-2 w-1/3"
	/>

	<ButtonGroup class="space-x-px">
		<Button size="xs" color="light" on:click={toggleSort}>
			{#if sortAscending}
				<BarsArrowUp size="15" />
			{:else}
				<BarsArrowDown size="15" />
			{/if}
		</Button>
		<slot/>
	</ButtonGroup>
</div>


<div class="flex {sortAscending ? 'flex-col-reverse' : 'flex-col'}">
	{#if filteredThreads.length > 0 }
		{#each filteredThreads as thread}
			<Thread thread={thread}  />
		{/each}
	{/if}
</div>



