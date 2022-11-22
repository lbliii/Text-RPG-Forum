<script>
    import Character from '../../components/Character.svelte';
    import {characters} from '../../stores/characterStore.js';
    import {users} from '../../stores/userStore.js';
    import {account} from '../../stores/authStore.js';
</script>

<main class="m-2">
    <h1 class="text-4xl font-bold dark:text-white text-center my-6">Your Characters</h1>

    {#each $users as user}
        {#if user.user_id === $account.id}
            {#each $characters as character}
                {#if character.user_id === user.user_id}
                    <Character character={character} profile={user} />
                {/if}
            {/each}
        {/if}
    {/each}

</main>