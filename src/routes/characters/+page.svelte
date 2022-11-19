<script>
    import Character from '../../components/Character.svelte';
    import {characters} from '../../stores/characterStore.js';
</script>

<main>
    <h1 class="text-3xl font-bold dark:text-white text-center">Your Characters</h1>

    {#each $characters as character}
         <Character character={character} index={characters.id} />
    {/each}

</main>