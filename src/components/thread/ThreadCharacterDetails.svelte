<script>
	import { threadCharactersStore } from '../../stores/threadCharactersStore.js';
	import { Avatar } from 'flowbite-svelte';

	export let thread;

	let characters = []
	
		threadCharactersStore.fetchThreadCharacters(thread.id).then((data) => {
			characters = data;
		});
	
</script>

{#if thread.id && characters.length > 0}
	{#each characters as character}
			{#if character.avatar}
				<Avatar size="md" stacked="true" alt="{character.first_name}" src="{character.avatar}"/>
			{/if}
	{/each}
{/if }