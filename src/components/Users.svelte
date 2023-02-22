<script>
  import { usersStore } from '../stores/usersStore.js';
  import { Button, Badge,  Card, } from 'flowbite-svelte';

  let searchTerm = "";
  let filteredUsers = $usersStore;

  $: {
    if (searchTerm) {
      filteredUsers = $usersStore.filter((user) => {
        return user.alias.toLowerCase().includes(searchTerm.toLowerCase());
      });
    } else {
      filteredUsers = $usersStore;
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
      </Card>
    </div>
  {/each}
</section>