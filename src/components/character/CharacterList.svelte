<script>
	import { charactersStore } from '../../stores/charactersStore.js';
	import { Avatar, Badge,  Card, Heading, P } from 'flowbite-svelte';
	import CharacterThreadCounter from './CharacterThreadCounter.svelte';
	import CharacterCRUD from './CharacterCRUD.svelte';

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
		<Card size="lg" padding="sm" class="my-2" href="/character/{character.id}">
			<div class="flex flex-row justify-between items-center"> 
				<Avatar size="lg" src="{character.avatar}" />
				<Heading tag="h3" class="ml-6">{character.first_name} {character.last_name}</Heading>
			</div>
			
			<div class="flex flex-row justify-between my-4">
				{#if character.age}
					<Badge color="pink">lvl. {character.age}</Badge>
				{/if}
				{#if character.soul}
					<Badge color="purple">{character.soul}</Badge>
				{/if}
				{#if character.species}
					<Badge color="green">{character.species}</Badge>
				{/if}
				{#if character.gender}
					<Badge color="yellow">{character.gender}</Badge>
				{/if}
				{#if character.relationship_status}
					<Badge color="blue">{character.relationship_status}</Badge>
				{/if}
			</div>

			<div class="flex flex-row justify-end items-center">
				{#if character.id}
				<CharacterThreadCounter character={character}/>
				{/if}
			</div>
		</Card>
	{/each}
{/if}
