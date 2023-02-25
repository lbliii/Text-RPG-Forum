<script>
  import { userStore } from '../../../stores/userStore.js';
  import User from '../../../components/User.svelte'
  import UserForm from '../../../components/UserForm.svelte'
  import CharacterForm from '../../../components/CharacterForm.svelte'


  export let data;


</script>

<main >

  {#if $userStore.user_id == data.user_id}
    <CharacterForm />
  {/if}

  {#if $userStore}
    <User user={data} />

    {#if $userStore.profile_setup == false}
      <UserForm profile={$userStore} edit={false} />
    {/if}
  {/if}

</main>