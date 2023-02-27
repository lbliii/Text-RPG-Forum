<script>
    import { characterStore } from '../../../stores/characterStore.js';
    import CharacterCRUD from '../../../components/CharacterCRUD.svelte';
    import CharacterDetails from '../../../components/CharacterDetails.svelte';
    import CharacterThreadList from '../../../components/CharacterThreadList.svelte';

    $: $characterStore

</script>

<main>
    
    <CharacterCRUD create={false} character={$characterStore} />
    <CharacterDetails character={$characterStore} />
    <CharacterThreadList character={$characterStore} />
    
</main>