<script>
  import { account } from '../stores/accountStore.js';
  import { supabase } from '../supabase.js';
  import { loadProfile } from '../stores/profileStore.js';
  import Auth from '../components/Account.svelte';
  import Navbar from '../components/Navbar.svelte';
  import "../app.css";

  const handleSession = ({ data, error }) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }

    if (data.session) {
      account.set(data.session.user);
      loadProfile(data.session.user.id);
    }
  };

  supabase.auth
    .getSession()
    .then(handleSession)
    .catch(console.error);

  supabase.auth.onAuthStateChange((_, session) => {
    account.set(session?.user || false);
  });

</script>

<body class="bg-transparent dark:bg-gray-800 container mx-auto my-6 max-w-xl px-1">
  {#if $account}
      <Navbar />
      <slot />
  {:else}
      <Auth />
  {/if}
</body>