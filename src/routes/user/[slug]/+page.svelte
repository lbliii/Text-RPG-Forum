<script>
  export let data;
  let user = data;
  import User from '../../../components/User.svelte'
  import UserForm from '../../../components/UserForm.svelte'
  import ProfileMenu from '../../../components/ProfileMenu.svelte'

  console.log(user)

</script>

<main >

<ProfileMenu />



{#if user}
  <User user={user} />
{/if}

{#if user.profile_setup == false}
  <UserForm user={user} edit={false} />
{/if}

</main>