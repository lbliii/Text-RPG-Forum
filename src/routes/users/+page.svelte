<script>
    import Users from '../../components/Users.svelte';

</script>

<main>
    <h1 class="text-4xl font-bold dark:text-white text-center my-6">Users</h1>

    <Users  />

    <!-- {#each $users as user}
         <User user={user} account={account} />
    {/each} -->

</main>