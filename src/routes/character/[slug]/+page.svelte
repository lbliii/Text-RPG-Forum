<script>
    import { characterStore } from '../../../stores/characterStore.js';
    import CharacterCRUD from '../../../components/character/CharacterCRUD.svelte';
    import CharacterDetails from '../../../components/character/CharacterDetails.svelte';
    import CharacterThreadList from '../../../components/character/CharacterThreadList.svelte';

    $: $characterStore

</script>

<main>
    <CharacterCRUD create={false} character={$characterStore} player={$characterStore.user_id}/>
    <CharacterDetails character={$characterStore} />
    <CharacterThreadList character={$characterStore} />
</main>