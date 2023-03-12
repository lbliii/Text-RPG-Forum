<script>
    import { charactersStore } from '../../stores/charactersStore.js';
    import { Heading} from 'flowbite-svelte';
    import { Newspaper } from 'svelte-heros-v2';
    import CharacterThreadList from '../character/CharacterThreadList.svelte';
    import { fade } from 'svelte/transition';
    
    export let user

    $: {
    if (user.user_id) {
      charactersStore.fetchCharacters(user.user_id);
    }
  }

</script>

<div in:fade="{{ duration: 1100 }}">
  {#if $charactersStore.length > 0}
    <Heading tag="h2" class="text-white my-6"><Newspaper size="30" class="inline-flex mr-3"/>Active Threads</Heading>

      {#each $charactersStore as character}
          <div class="mx-3">
              <Heading tag="h3" class="text-white my-6">{character.first_name} {character.last_name}</Heading>
           
              <CharacterThreadList character={character} compact={true}/>
  
          </div>
      {/each}

  {/if}
</div>

