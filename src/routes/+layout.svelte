<script>
  import { supabase } from '../supabase.js';
  import Auth from '../components/Auth.svelte';
  import {user} from '../stores/authStore.js';
  import "../app.css";
	import { loadTodos } from '../stores/todoStore.js';
  import Navbar from '../components/Navbar.svelte';



// check if there's a user logged in
  $: supabase.auth.onAuthStateChange(async (event, session) => {
    console.log("auth state change", event, session);
    if (event === 'SIGNED_IN') {
      user.set(session.user);
      loadTodos();
    } else {
      user.set(false);
    }
  });

</script>

<div class="container mx-auto my-6 max-w-lg">
  {#if $user !== true }
    <Navbar/>
    <slot>  </slot>
  {:else}
    <Auth />
  {/if}
</div>

