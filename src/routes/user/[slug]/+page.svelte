<script>
  export let data;
  let user = data;
  import User from '../../../components/User.svelte'
  import UserForm from '../../../components/UserForm.svelte'
</script>

<main>


<User user={user} />

{#if user.profile_setup == false}
<UserForm user={user} />
{/if}

</main>