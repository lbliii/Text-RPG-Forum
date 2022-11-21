<script>
    import User from '../../components/User.svelte';
    import {users} from '../../stores/userStore.js';
</script>

<main class="m-2">
    <h1 class="text-4xl font-bold dark:text-white text-center my-6">Users</h1>

    {#each $users as user}
         <User user={user} />
    {/each}

</main>