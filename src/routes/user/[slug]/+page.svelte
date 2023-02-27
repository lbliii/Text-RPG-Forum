<script>
  import { userStore } from '../../../stores/userStore.js';
  import { playerStore } from '../../../stores/playerStore.js';
  import UserDetails from '../../../components/UserDetails.svelte'
  import UserForm from '../../../components/UserCRUD.svelte'
  import UserCRUD from '../../../components/UserCRUD.svelte'
  import CharacterCRUD from '../../../components/CharacterCRUD.svelte'

 $: $playerStore

</script>

<main>

  <CharacterCRUD create={true} player={$playerStore} />

  <UserDetails user={$playerStore} />

  <UserCRUD player={$playerStore} edit={$playerStore.profile_setup}/>
  
  <!-- {#if $playerStore}
    {#if $userStore.profile_setup == false}
      <UserForm profile={$playerStore} edit={false} />
    {/if}
  {/if} -->

</main>