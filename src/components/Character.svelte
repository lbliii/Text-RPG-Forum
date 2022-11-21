<script>
    export let character;
    import {Avatar, Badge, Button, Card, Heading, P, Tooltip} from 'flowbite-svelte'
    import {deleteCharacter,} from '../stores/characterStore.js';
    import {account} from '../stores/authStore.js';

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
     <Card size="lg" padding="sm" href="/character/{character.id}">
        <Avatar data-name="{character.first_name}" class="my-2" rounded>{character.first_name}</Avatar>
        <Tooltip triggeredBy="[data-name]" on:show={e => name = e.target.dataset.name}>{name}</Tooltip>

        <Heading tag="h2" class="mb-2"> {character.first_name} {character.last_name}</Heading>

        <div class="flex flex-row justify-between my-2"> 
            <P weight="bold"> Basic Info</P>
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

        <P class="my-2">{character.bio}</P>
        {#if checkIfOwner()}
        <div class="flex justify-end my-2">
            <Button size="xs" color="light" class="mr-2">Edit</Button>
            <Button size="xs" color="red" on:click={() => deleteCharacter(character.id)}>Delete</Button>
        </div>
        {/if}
    </Card>
</div>

