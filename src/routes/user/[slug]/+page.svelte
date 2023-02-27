<script>

  import { playerStore } from '../../../stores/playerStore.js';
  import UserDetails from '../../../components/UserDetails.svelte'
  import UserCRUD from '../../../components/UserCRUD.svelte'
  
 $: $playerStore

</script>

<main>

  <UserCRUD player={$playerStore} edit={$playerStore.profile_setup}/>

  <UserDetails user={$playerStore} />

  
  <!-- {#if $playerStore}
    {#if $userStore.profile_setup == false}
      <UserForm profile={$playerStore} edit={false} />
    {/if}
  {/if} -->

</main>