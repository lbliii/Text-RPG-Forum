<script>
  import { account } from '../stores/authStore.js';
  import { supabase } from '../supabase.js';
  import Auth from '../components/Auth.svelte';
  import Navbar from '../components/Navbar.svelte';
  import "../app.css";


  supabase.auth.getSession()
    .then(({ data, error }) => {
      if (data.session === null) {
        console.log("user is not logged in");
        account.set(false);
      }
      else if (data.session !== null) {
        console.log("user is logged in");
        account.set(data.session?.user);
      }
      else if (error) {
        console.log("error: " + error.message);
      }
    })

  supabase.auth.onAuthStateChange(( _, session) => {
      account.set(session?.user);

      if (!session?.user){
          account.set(false);
      }
  });

console.log(account)
</script>

<body class="bg-white dark:bg-gray-800">
  <div class="container mx-auto my-6 max-w-xl px-1">
{#if $account}
    <Navbar/>
    <slot>  </slot>
 {:else}
    <Auth />
  {/if}
 </div>
</body>




