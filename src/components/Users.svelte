<script>
  import { profileStore } from '../stores/profileStore.js';
  import { Button, Heading, Badge, ButtonGroup, Card, P, Hr } from 'flowbite-svelte';
  import Characters from './Characters.svelte';
  import { onDestroy } from 'svelte';

  let users = [];
  let searchTerm = "";
  let filteredUsers = [];

  const unsubscribe = profileStore.users.subscribe((value) => {
    users = value;
  });

  onDestroy(() => {
    unsubscribe();
  });

  $: {
    if (searchTerm) {
      filteredUsers = users.filter((user) => {
        return user.alias.toLowerCase().includes(searchTerm.toLowerCase());
      });
    } else {
        filteredUsers = users;
      
    }
  }

</script>

<section class="my-2">
  <div class="flex justify-end items-center my-2">
    <input type="text" placeholder="Search users" bind:value={searchTerm} class="border border-gray-400 rounded-md p-2 w-1/3" />
  </div>
  {#each filteredUsers as user}
    <div class="my-2">
      <Card size="lg" padding="sm">
        <div class="flex flex-row justify-between">
          <Button pill={true} size="md" outline={true} class="w-fit" href="/user/{user.user_id}">@{user.alias}</Button>
          <div class="flex flex-row justify-end my-2">
            {#if user.age}
              <Badge color="pink" class="mx-1">{user.age} </Badge>
            {/if}
            {#if user.time_zone}
              <Badge color="dark">{user.time_zone} </Badge>
            {/if}
          </div>
        </div>
        <div class="m-2">
          {#if user.likes}
            <Heading tag="h2" class="my-2"> Likes</Heading>
            <P class="my-2">{@html user.likes}</P>
          {/if}
        </div>
        <div class="m-2">
          {#if user.dislikes}
            <Heading tag="h2" class="mb-2"> Dislikes</Heading>
            <P class="my-2">{@html user.dislikes}</P>
          {/if}
        </div>

        <Hr class="my-8" width="w-64" height="h-1" icon >
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-700 dark:text-gray-300"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          ><path
              d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
              fill="currentColor"
            /></svg>
        </Hr>
        <Characters user={user} />
      </Card>
    </div>
  {/each}
</section>
