<script>
    import {userStore} from '../../../stores/userStore.js';
    import {Heading, Badge, Card, Avatar} from 'flowbite-svelte'
    import Character from '../../../components/Character.svelte';
    import { characterStore } from '../../../stores/characterStore.js';
    import CharacterCRUD from '../../../components/CharacterCRUD.svelte';

    export let data;
    let character = data;

    $: $characterStore

</script>

<main>
    {#if $userStore.user_id == character.user_id}
        <CharacterCRUD create={false} character={character} />
    {/if}
    <div class="flex flex-row my-10 items-center ">
        <Heading tag="h3" class="my-3 text-center text-white">{character.first_name} </Heading>
        <Avatar src={character.avatar} size="xl" class="mx-auto" />
        <Heading tag="h3" class="my-3 text-center text-white">{character.last_name}</Heading>
    </div>
    <Character character={$characterStore} />
</main>