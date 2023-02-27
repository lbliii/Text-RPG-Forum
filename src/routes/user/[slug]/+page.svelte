<script>
  import { userStore } from '../../../stores/userStore.js';
  import User from '../../../components/User.svelte'
  import UserForm from '../../../components/UserCRUD.svelte'
  import CharacterCRUD from '../../../components/CharacterCRUD.svelte'


  export let data;

</script>

<main >

  {#if $userStore.user_id == data.user_id}
    <CharacterCRUD create={true} />
  {/if}

  {#if $userStore}
    <User user={data} />

    {#if $userStore.profile_setup == false}
      <UserForm profile={$userStore} edit={false} />
    {/if}
  {/if}

</main>