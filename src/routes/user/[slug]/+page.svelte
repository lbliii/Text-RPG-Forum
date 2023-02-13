<script>
  import User from '../../../components/User.svelte'
  import UserForm from '../../../components/UserForm.svelte'
  import ProfileMenu from '../../../components/ProfileMenu.svelte'
  import {accountStore} from '../../../stores/accountStore.js';

  export let data;
  let user = data;
  let account;
  
    $: accountStore.subscribe(user => {
    account = user;
    });


console.log(user)
</script>

<main >

  <ProfileMenu />

  {#if user}
    <User user={user} account={account} />

    {#if user.profile_setup == false}
      <UserForm profile={user} edit={false} />
    {/if}
  {/if}

</main>