<script>
  import User from '../../../components/User.svelte'
  import UserForm from '../../../components/UserForm.svelte'
  import ProfileMenu from '../../../components/ProfileMenu.svelte'
  import { authStore } from '../../../stores/authStore.js';

  export let data;
  let user = data;
  let auth;
  
    $: authStore.subscribe(user => {
    auth = user;
    });

</script>

<main >

  <ProfileMenu />

  {#if user}
    <User user={user} auth={auth} />

    {#if user.profile_setup == false}
      <UserForm profile={user} edit={false} />
    {/if}
  {/if}

</main>