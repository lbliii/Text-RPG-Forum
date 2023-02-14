<script>
  export let user;
  export let account;

  import { Avatar, Badge, Button, Card, Heading, Hr, Modal, P } from 'flowbite-svelte';
  import Characters from '../components/Characters.svelte';
  import UserForm from '../components/UserForm.svelte';
  

  let editProfile = false;

  function isOwner() {
    return user.user_id === account.id;
  }

</script>


<div class="my-2">
     <Card size="lg" padding="sm">
        <div class="flex flex-row justify-end  my-2"> 
            {#if user.age}
            <Badge color="pink">{user.age} </Badge>
            {/if}
            {#if user.time_zone}
            <Badge color="dark">{user.time_zone} </Badge>
            {/if}
        </div>
        <Button pill={true} size="xl" outline={true} class="w-fit" href="/user/{user.user_id}">@{user.alias}</Button>

        {#if user.likes}
            <Heading tag="h2" class="mb-2"> Likes</Heading>
            <P class="my-2">{@html user.likes}</P>
        {/if}
        {#if user.dislikes}
            <Heading tag="h2" class="mb-2"> Dislikes</Heading>
            <P class="my-2">{@html user.dislikes}</P>
        {/if}

        {#if isOwner()}
        <div class="flex justify-end my-2">
            <Button size="xs" color="light" class="mr-2" on:click={() => editProfile = true}>Edit</Button>
        </div>
        {/if}
        <Hr class="my-8" width="w-64" height="h-1" > ... 
        </Hr>
        <Characters user={user} owner={isOwner()} />
    </Card>
</div>

<Modal bind:open={editProfile} size="xs" autoclose={false}>
    <UserForm profile="{user}" edit={true}/>
</Modal>