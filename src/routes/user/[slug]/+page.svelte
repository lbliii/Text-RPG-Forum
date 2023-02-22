<script>
  import User from '../../../components/User.svelte'
  import UserForm from '../../../components/UserForm.svelte'
  import ProfileMenu from '../../../components/ProfileMenu.svelte'
  import { userStore } from '../../../stores/userStore.js';

  export let data = $userStore;


</script>

<main >

  <ProfileMenu />

  {#if $userStore}
    <User user={data} />

    {#if $userStore.profile_setup == false}
      <UserForm profile={$userStore} edit={false} />
    {/if}
  {/if}

</main>