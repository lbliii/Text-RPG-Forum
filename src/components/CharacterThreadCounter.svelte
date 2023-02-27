<script>
	import { Badge} from 'flowbite-svelte';
	import { threadCharacterStore } from '../stores/threadCharacterStore.js';

	export let character
	let thread_count;

	async function countThreads(character_id) {
		let count = await threadCharacterStore.fetchCharacterThreads(character_id)
		return thread_count = count.length
	}

</script>

<Badge color="gray">
	{#await countThreads(character.id)}
		...
	{:then thread_count}
		{thread_count} Threads
	{/await}
</Badge>