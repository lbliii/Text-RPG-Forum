<script>

  import { playerStore } from '../../../stores/playerStore.js';
  import UserDetails from '../../../components/UserDetails.svelte'
  import UserCRUD from '../../../components/UserCRUD.svelte'
  import CharacterList from '../../../components/CharacterList.svelte'
  
 $: $playerStore

</script>

<main>

  <UserCRUD player={$playerStore} edit={$playerStore.profile_setup}/>
  <UserDetails user={$playerStore} />
  <CharacterList user={$playerStore} />

</main>