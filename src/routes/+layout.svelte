<script>
  import { account } from '../stores/accountStore.js';
  import { supabase } from '../supabase.js';
  import { loadProfile, profile } from '../stores/profileStore.js';
  import Auth from '../components/Account.svelte';
  import Navbar from '../components/Navbar.svelte';
  import "../app.css";

  supabase.auth.getSession()
    .then(({ data, error }) => {
      if (data.session !== null) {
        account.set(data.session?.user);
        loadProfile(data.session?.user.id);
      }
      if (error) {
        console.log("error: " + error.message);
      }
    })

  supabase.auth.onAuthStateChange(( _, session) => {
      account.set(session?.user);
      if (!session?.user){
          account.set(false);
      }
  });

</script>

<body class="bg-transparent dark:bg-gray-800 container mx-auto my-6 max-w-xl px-1">
 
  {#if $account}
      <Navbar/>
      <slot>  </slot>
  {:else}
      <Auth />
    {/if}
</body>




