<script>
  import { authStore } from '../stores/authStore.js';
  import Auth from '../components/Auth.svelte';
  import Navbar from '../components/Navbar.svelte';
  import "../app.css";

  let auth;

  $: authStore.subscribe(user => {
    auth = user;
  });

</script>
  <body class="bg-transparent dark:bg-gray-800 container mx-auto my-6 max-w-xl px-1">
    {#if auth}
        <Navbar auth="{auth}" />
        <slot />
    {:else}
        <Auth />
    {/if}
  </body>
