<script>
    import CharacterForm from '../../../components/CharacterForm.svelte';
    import Character from '../../../components/Character.svelte';
    import {characters} from '../../../stores/characterStore.js';
</script>

<main>
    <h1 class="text-3xl font-bold dark:text-white text-center">Create a Character</h1>
    <CharacterForm />

</main>