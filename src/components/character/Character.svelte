<script>
	import { charactersStore } from '../../stores/charactersStore.js';
	import { Avatar, Badge,  Card, Heading} from 'flowbite-svelte';
    import { fade } from 'svelte/transition';
	import CharacterThreadCounter from './CharacterThreadCounter.svelte';

	export let user = {}
    export let character = {}

	$: $charactersStore

	$: {
    if (user) {
      charactersStore.fetchCharacters(user.user_id);
    }
  }

</script>

<div in:fade="{{ duration: 1100 }}">
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
</div>


