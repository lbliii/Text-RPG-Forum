<script>
    import Character from '../../components/Character.svelte';
    import {characters} from '../../stores/characterStore.js';
</script>

<main class="m-2">
    <h1 class="text-4xl font-bold dark:text-white text-center my-6">All Characters</h1>

    {#each $characters as character}
         <Character character={character} index={characters.id} />
    {/each}

</main>