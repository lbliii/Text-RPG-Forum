<script>
	import { Avatar, Badge,  Card, Heading, P } from 'flowbite-svelte';
	import { charactersStore } from '../stores/charactersStore.js';
	import { userStore } from '../stores/userStore.js';
	import CharacterThreadCounter from './CharacterThreadCounter.svelte';

	export let user = $userStore;
	charactersStore.fetchCharacters(user.user_id);

	$: $charactersStore

</script>

{#if $charactersStore}
	{#each $charactersStore as character}
		<Card size="lg" padding="sm" class="my-2" href="/character/{character.id}">
			<div class="flex flex-row justify-between items-center"> 
				<Avatar size="lg" src="{character.avatar}" />
				<Heading tag="h3" class="ml-2 text-center">{character.first_name} {character.last_name}</Heading>
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
				<CharacterThreadCounter character={character}/>
			</div>
		</Card>
	{/each}
{/if}
