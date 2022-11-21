<script>
    export let user;
    import {Avatar, Badge, Button, Card, Heading, P, Tooltip} from 'flowbite-svelte'
    import {account} from '../stores/authStore.js';
    import Character from '../components/Character.svelte';
    import {characters} from '../stores/characterStore.js';

    console.log(user);
    let id = $account.id
    function checkIfOwner() {

        if (user.user_id === id) {
            return true;
        }
        else {
            return false;
        }
    }
</script>


<div class="my-2">
     <Card size="lg" padding="sm" href="/user/{user.user_id}">
        <Avatar data-name="{user.alias}" class="my-2" rounded>{user.alias}</Avatar>
        <Tooltip triggeredBy="[data-name]" on:show={e => name = e.target.dataset.name}>{name}</Tooltip>

        <Heading tag="h2" class="mb-2"> {user.alias}</Heading>

        <div class="flex flex-row justify-between my-2"> 
            <P size="3xl" weight="bold"> Basic Info</P>
            {#if user.age}
            <Badge color="pink">{user.age} </Badge>
            {/if}
            {#if user.gender}
            <Badge color="yellow">{user.gender} </Badge>
            {/if}
        </div>
        {#if user.likes}
            <P size="2xl" weight="bold">Likes</P>
            <P>{user.likes}</P>
        {/if}
        {#if user.dislikes}
            <P size="2xl" weight="bold">Dislikes</P>
            <P>{user.dislikes}</P>
        {/if}

        {#if checkIfOwner()}
        <div class="flex justify-end my-2">
            <Button size="xs" color="light" class="mr-2">Edit</Button>
        </div>
        {/if}

        {#each $characters as character}
            {#if character.user_id === user.user_id}
                <Character character={character} />
            {/if}
        {/each}
    </Card>
</div>

