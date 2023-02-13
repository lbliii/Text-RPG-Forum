<script>
  import { accountStore } from '../stores/accountStore.js';
  import Auth from '../components/Account.svelte';
  import Navbar from '../components/Navbar.svelte';
  import "../app.css";

  let account;

  $: account = accountStore.subscribe(user => {
    if (user) {
      return user
    }
    return user;
  }
  );

</script>

<body class="bg-transparent dark:bg-gray-800 container mx-auto my-6 max-w-xl px-1">
  {#if account}
      <Navbar  />
      <slot />
  {:else}
      <Auth />
  {/if}
</body>