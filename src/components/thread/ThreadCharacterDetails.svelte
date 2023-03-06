<script>
	import { threadCharactersStore } from '../../stores/threadCharactersStore.js';
	import { characterStore } from '../../stores/characterStore.js';
	import { Avatar } from 'flowbite-svelte';

	export let thread;

	async function loadThreadCharacters() {
  		let characterIds = await threadCharactersStore.fetchThreadCharacters(thread.id).then(data => data.map(link => link.character_id));
  		let characters = await Promise.all(characterIds.map(characterId => characterStore.fetchCharacter(characterId)));
  	return characters;
}	
</script>

{#await loadThreadCharacters() then characters }
	{#each characters as character}
		{#if character.avatar }
			<Avatar size="md" stacked="true" alt="{character.first_name}" src="{character.avatar}"/>
		{/if}
	{/each}
{/await}
