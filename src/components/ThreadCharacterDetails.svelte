<script>
	import { threadCharactersStore } from '../stores/threadCharactersStore.js';
	import { characterStore } from '../stores/characterStore.js';
	import { Avatar, Badge } from 'flowbite-svelte';

	export let thread;

	

	async function loadThreadCharacters() {
  	let characterIds = await threadCharactersStore.fetchThreadCharacters(thread.id).then(data => data.map(link => link.character_id));
  	let characters = await Promise.all(characterIds.map(characterId => characterStore.fetchCharacter(characterId)));
	console.log("characters", characters)
  	return characters;
}

	
</script>

{#await loadThreadCharacters() then characters }
	<div class="flex flex-row justify-start my-2"> 
	{#each characters as character}
		{#if character !== undefined}
			<Badge class="w-fit my-2">{character.first_name} </Badge>
		{/if}
	{/each}
	</div>
{/await}



<!-- todo: check the thread_characters table to list the characters -->