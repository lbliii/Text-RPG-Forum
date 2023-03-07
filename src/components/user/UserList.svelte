<script>
  import { usersStore } from '../../stores/usersStore.js';
  import User from './User.svelte';

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

  <div class="flex justify-end items-center my-2">
    <input type="text" placeholder="Search users" bind:value={searchTerm} class="border border-gray-400 rounded-md p-2 w-1/3" />
  </div>

  {#each filteredUsers as user}
      <User user={user} />
  {/each}
