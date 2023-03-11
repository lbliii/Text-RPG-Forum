<script>
	import { threadCharactersStore } from '../../stores/threadCharactersStore.js';
	import { Avatar } from 'flowbite-svelte';

	export let thread;
	

	async function loadThreadCharacters() {
  		let characters = await threadCharactersStore.fetchThreadCharacters(thread.id);
  	return characters;
}	
</script>
{#if thread.id}
	{#await loadThreadCharacters() then characters }
		{#each characters as character}
			{#if character.avatar }
				<Avatar size="md" stacked="true" alt="{character.first_name}" src="{character.avatar}"/>
			{/if}
		{/each}
	{/await}
{/if}