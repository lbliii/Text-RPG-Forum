<script>
    import CharacterForm from '../../components/CharacterForm.svelte';
    import Character from '../../components/Character.svelte';
    import {characters} from '../../stores/characterStore.js';
</script>

<main>
    <h1 class="text-3xl font-bold dark:text-white">Characters</h1>
    <CharacterForm />

    {#each $characters as character}
         <Character character={character} index={characters.id} />
    {/each}

</main>