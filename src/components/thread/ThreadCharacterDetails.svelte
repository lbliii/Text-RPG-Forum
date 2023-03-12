<script>
	import { threadCharactersStore } from '../../stores/threadCharactersStore.js';
	import { Avatar } from 'flowbite-svelte';

	export let thread;
	

	async function loadThreadCharacters(thread_id) {
	
  		let characters = await threadCharactersStore.fetchThreadCharacters(thread.id);
		
  	return characters? characters : [];
}	
</script>


{#if thread.id}
	{#await loadThreadCharacters(thread.id) then characters }
		{#if characters}
			{#each characters as character}
				{#if character.avatar }
					<Avatar size="md" stacked="true" alt="{character.first_name}" src="{character.avatar}"/>
				{/if}
			{/each}
		{/if}
	{/await}
{/if}