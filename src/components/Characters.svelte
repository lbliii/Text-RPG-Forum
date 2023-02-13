<script>
import { Avatar, Badge, Button, Card, Heading, Hr, Modal, P } from 'flowbite-svelte';
import { characterStore } from '../stores/characterStore.js';

export let user;
let characters;

characterStore.loadCharacters(user.user_id).then(res => {
  characters = res;
});

</script>

{#if characters}
    <div>
        {#each characters as character}
            <Card  size="lg" padding="sm" class="my-2">
                <Heading tag="h2" class="mb-2"> {character.first_name} {character.last_name}</Heading>
                <div class="flex flex-row justify-between my-2"> 
                    {#if character.age}
                    <Badge color="pink">{character.age} </Badge>
                    {/if}
                    {#if character.gender}
                    <Badge color="yellow">{character.gender} </Badge>
                    {/if}
                    {#if character.relationship_status}
                    <Badge color="blue">{character.relationship_status}</Badge>
                    {/if}
                    {#if character.soul}
                    <Badge color="purple">{character.soul} </Badge>
                    {/if}
                    {#if character.species}
                    <Badge color="green">{character.species} </Badge>
                    {/if}
                </div>

                <P class="my-2">{@html character.bio}</P>
            </Card>
        {/each}
    </div>
{/if}