<script>
  import { account } from '../stores/accountStore.js';
  import { loadProfile } from '../stores/profileStore.js';
  import Auth from '../components/Account.svelte';
  import Navbar from '../components/Navbar.svelte';
  import "../app.css";

  let user;

  $: user = $account;

  $: if (user) {
    loadProfile(user.id);
  }

</script>

<body class="bg-transparent dark:bg-gray-800 container mx-auto my-6 max-w-xl px-1">
  {#if $account}
      <Navbar />
      <slot />
  {:else}
      <Auth />
  {/if}
</body>