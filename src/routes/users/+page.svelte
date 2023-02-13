<script>
    import User from '../../components/User.svelte';
    import {profileStore} from '../../stores/profileStore.js';

    let users;

    $: {
        users = profileStore.users;
    }


</script>

<main>
    <h1 class="text-4xl font-bold dark:text-white text-center my-6">Users</h1>

    {#each $users as user}
         <User user={user} />
    {/each}

</main>