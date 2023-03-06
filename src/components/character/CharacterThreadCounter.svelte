<script>
	import { threadCharacterStore } from '../../stores/threadCharacterStore.js';
	import { Badge} from 'flowbite-svelte';

	export let character
	let thread_count;

	async function countThreads(character_id) {
		let count = await threadCharacterStore.fetchCharacterThreads(character_id)
		return thread_count = count.length
	}

</script>
{#if character.id}
	<Badge color="gray">
		{#await countThreads(character.id)}
			...
		{:then thread_count}
			{thread_count} Threads
		{/await}
	</Badge>
{/if}
