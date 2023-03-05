<script>
  import { authStore } from '../stores/authStore.js';
  import { userStore } from '../stores/userStore.js';
  import Auth from '../components/Auth.svelte';
  import Navbar from '../components/Navbar.svelte';
  import "../app.css";

  $: $userStore


</script>

  <body class="bg-transparent dark:bg-gray-800 container mx-auto my-6 max-w-xl px-1">
    {#if $authStore.id}
        <Navbar user={$authStore.id} />
        <slot />
    {:else}
        <Auth />
    {/if}
  </body>


  