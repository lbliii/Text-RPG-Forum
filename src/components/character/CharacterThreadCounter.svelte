<script>
	import { threadCharacterStore } from '../../stores/threadCharacterStore.js';
	import { Newspaper } from 'svelte-heros-v2'

	export let character
	let thread_count;

	async function countThreads(character_id) {
		let count = await threadCharacterStore.fetchCharacterThreads(character_id)
		return thread_count = count.length
	}
</script>

{#if character.id}
	{#await countThreads(character.id)}
		...
	{:then thread_count}
		<Newspaper/> {thread_count} 
	{/await}
{/if}
