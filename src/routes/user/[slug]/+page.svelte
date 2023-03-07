<script>

  import { playerStore } from '../../../stores/playerStore.js';
  import UserDetails from '../../../components/user/UserDetails.svelte'
  import UserCRUD from '../../../components/user/UserCRUD.svelte'
  import CharacterList from '../../../components/character/CharacterList.svelte'
  
 $: $playerStore

</script>

<main>
  <UserCRUD player={$playerStore} edit={$playerStore.profile_setup}/>
  <UserDetails user={$playerStore} />
  <CharacterList user={$playerStore} />
</main>