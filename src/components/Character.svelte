<script>
    import {Badge, Button, Card, Heading, Modal, P} from 'flowbite-svelte'
    import {deleteCharacter} from '../stores/characterStore.js';
    import CharacterForm from '../components/CharacterForm.svelte';
    import {account} from '../stores/accountStore.js';
   

    export let character;
    export let profile;

    let deleteModal = false;
    let editModal = false;

    function checkIfOwner() {
        let id = $account.id
        if (character.user_id === id) {
            return true;
        }
        else {
            return false;
        }

    }

</script>


<div class="my-2">
     <Card size="lg" padding="sm">
        <Button pill={true} size="xs" outline={true} class="w-fit" href="/user/{character.user_id}">@{profile.alias}</Button>

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
   
        {#if checkIfOwner()}
        <div class="flex justify-end my-2">
            <Button size="xs" color="light" on:click={() => editModal = true}>Edit</Button>
            <Button size="xs" color="red" on:click={() => deleteModal = true}>Delete</Button>
        </div>
        {/if}
    </Card>
</div>


<Modal bind:open={editModal} size="xs" autoclose={false}>
    <CharacterForm character="{character}" edit={true}/>
</Modal>

<Modal bind:open={deleteModal} size="xs" autoclose>
  <div class="text-center">
      <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this character?</h3>
      <Button color="red" class="mr-2" on:click={() => deleteCharacter(character)}>Yes, I'm sure</Button>
      <Button color='alternative'>No, cancel</Button>
  </div>
</Modal>

