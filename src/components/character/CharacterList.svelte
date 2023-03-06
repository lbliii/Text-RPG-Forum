<script>
	import { charactersStore } from '../../stores/charactersStore.js';
	import { Card, Heading } from 'flowbite-svelte';
	import CharacterCRUD from './CharacterCRUD.svelte';
	import Character from './Character.svelte';

	export let user 
	$: $charactersStore

	$: {
    if (user) {
      charactersStore.fetchCharacters(user.user_id);
    }
  }
</script>

<Heading tag="h2" class="text-center text-white my-6">{user.alias}'s Characters</Heading>

{#if $charactersStore && $charactersStore.length === 0}
	<Card size="lg" padding="sm" class="my-2">
		<div class="flex flex-col text-center"> 
			<Heading tag="h3" class="mb-6">No Characters Yet</Heading>
			<CharacterCRUD create={true} player={user}/>
		</div>
	</Card>
{:else }
	{#each $charactersStore as character}
		<Character character={character} user={user}/>
	{/each}
{/if}
