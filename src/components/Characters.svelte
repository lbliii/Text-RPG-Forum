<script>
import { Avatar, Badge, Button, Card, Heading, Hr, Modal, P } from 'flowbite-svelte';
import { characterStore } from '../stores/characterStore.js';
import CharacterForm from '../components/CharacterForm.svelte';

export let owner;
export let user;

let characters;
let deleteModal = false;
let editModal = false;
let selectedCharacter;


$: {
    characterStore.loadCharacters(user.user_id).then(res => {
        characters = res;
    });
}

// event handler from CharacterForm
function callbackFunction(event) {
        editModal =  event.detail

        characterStore.loadCharacters(user.user_id).then(res => {
        characters = res;
    });

}


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

                {#if owner}
                   <Button size="xs" color="light" class="mr-2" on:click={() => {editModal = true; selectedCharacter = character;}}>Edit</Button>
                   <Button size="xs" color="red" class="mr-2" on:click={() => {deleteModal = true; selectedCharacter = character;}}>Delete</Button>
                {/if}
            </Card>
        {/each}
    </div>
{/if}


<Modal bind:open={editModal} size="xs" autoclose={false}>
    <CharacterForm character="{selectedCharacter}" edit={true} on:notify="{callbackFunction}"  />
</Modal>

<Modal bind:open={deleteModal} size="xs" autoclose>
  <div class="text-center">
      <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this character?</h3>
      <Button color="red" class="mr-2" on:click={() => characterStore.deleteCharacter(selectedCharacter)}>Yes, I'm sure</Button>
      <Button color='alternative'>No, cancel</Button>
  </div>
</Modal>