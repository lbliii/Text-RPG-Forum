<script>
	import { Avatar, Badge, Card, Heading, P } from 'flowbite-svelte';
    import { threadCharacterStore } from '../stores/threadCharacterStore.js';

    /**
	 * @type {{ id: any; soul: string; species: string; age: number; gender: string; relationship_status: string; bio: string; }}
	 */
    export let character;

   threadCharacterStore.fetchCharacterThreads(character.id) // list of threads with matching character_id


</script>

<div class="flex flex-row my-10 items-center ">
        <Heading tag="h3" class="my-3 text-center text-white">{character.first_name} </Heading>
        <Avatar src={character.avatar} size="xl" class="mx-auto" />
        <Heading tag="h3" class="my-3 text-center text-white">{character.last_name}</Heading>
</div>

    <div class="flex flex-row justify-between my-6">
        <Card size="lg" padding="sm" class="text-center" >
        <Heading tag="h4" class="mb-2">Body & Soul</Heading>
            <div class="flex flex-col justify-between my-2">
    
                {#if character.soul}
                    <Badge large={true} color="purple" class="mb-2">{character.soul}</Badge>
                {/if}
                {#if character.species}
                    <Badge large={true} color="green" class="mb-2">{character.species}</Badge>
                {/if}
            </div>
        </Card>

        <Card size="lg" padding="sm" >
        <Heading tag="h4" class="mb-2 text-center">Life Stats</Heading>
            <div class="flex flex-col justify-between my-2">
                {#if character.age}
                    <Badge  large={true} color="pink" class="mb-2">{character.age}</Badge>
                {/if}
                {#if character.gender}
                    <Badge  large={true} color="yellow" class="mb-2">{character.gender}</Badge>
                {/if}
                {#if character.relationship_status}
                    <Badge  large={true} color="blue" class="mb-2">{character.relationship_status}</Badge>
                {/if}
            </div>
        </Card>
    </div>

    <Card size="lg" padding="sm" class="">
        <Heading tag="h4" class="mb-2">Biography</Heading>
        <P class="my-2">{@html character.bio}</P>
    </Card>

