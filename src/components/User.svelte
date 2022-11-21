<script>
    export let user;
    import {Avatar, Badge, Button, Card, Heading, P, Tooltip} from 'flowbite-svelte'
    import {account} from '../stores/authStore.js';

    function checkIfOwner() {
        let id = $account.id
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
            <P weight="bold"> Basic Info</P>
            {#if user.age}
            <Badge color="pink">{user.age} </Badge>
            {/if}
            {#if user.gender}
            <Badge color="yellow">{user.gender} </Badge>
            {/if}
        </div>
        {#if user.likes}
            <P>{user.likes}</P>
        {/if}
        {#if user.dislikes}
            <P>{user.dislikes}</P>
        {/if}

        {#if checkIfOwner()}
        <div class="flex justify-end my-2">
            <Button size="xs" color="light" class="mr-2">Edit</Button>
        </div>
        {/if}
    </Card>
</div>

