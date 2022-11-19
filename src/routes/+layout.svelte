<script>
  import { account } from '../stores/authStore.js';
  import { supabase } from '../supabase.js';
  import Auth from '../components/Auth.svelte';
	import { loadTodos } from '../stores/todoStore.js';
  import Navbar from '../components/Navbar.svelte';
  import { DarkMode } from "flowbite-svelte";
  import "../app.css";

  let btnClass="dark:text-white"

  supabase.auth.onAuthStateChange(( _, session) => {
      account.set(session?.user);
      if(session?.user){
          loadTodos();
      }
      else if (!session?.user){
          account.set(false);
      }
  });

</script>

<body class="bg-white dark:bg-gray-800">
  <DarkMode {btnClass} />
  <div class="container mx-auto my-6 max-w-lg p-1">
{#if $account}
    <Navbar/>
    <slot>  </slot>
 {:else}
    <Auth />
  {/if}
 </div>
</body>




