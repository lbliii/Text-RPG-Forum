<script>
    export let user;
    import {Avatar, Badge, Button, Card, Heading, P, Tooltip} from 'flowbite-svelte'
    import { } from '../stores/userStore.js';
    import { supabase } from '../supabase.js';

     function checkIfOwner() {
        if (user.user_id === supabase.auth.getUser().id) {
            return true;
        }
        else {
            return false;
        }
    }
</script>


<div class="my-2">
     <Card size="lg" padding="sm" href="/user/{user.id}">
        <Avatar data-name="{user.first_name}" class="my-2" rounded>{user.first_name}</Avatar>
        <Tooltip triggeredBy="[data-name]" on:show={e => name = e.target.dataset.name}>{name}</Tooltip>

        <Heading tag="h2" class="mb-2"> {user.first_name} {user.last_name}</Heading>

        <div class="flex flex-row justify-between my-2"> 
            <P weight="bold"> Basic Info</P>
            {#if user.age}
            <Badge color="pink">{user.age} </Badge>
            {/if}
            {#if user.gender}
            <Badge color="yellow">{user.gender} </Badge>
            {/if}
        </div>
    </Card>
</div>

