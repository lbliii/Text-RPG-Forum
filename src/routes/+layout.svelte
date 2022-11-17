<script>
  import { supabase } from '../supabase.js';
  import Auth from '../components/Auth.svelte';
  import {user} from '../stores/authStore.js';
  import "../app.css";
	import { loadTodos } from '../stores/todoStore.js';
  import Navbar from '../components/Navbar.svelte';

// check for user session
  const session = supabase.auth.getSession();
  if (session) {
    user.set(session.user);
    // load todos
    loadTodos();
  }
  else {
    user.set(false);
  }

console.log(user);
</script>

<div class="container mx-auto my-6 max-w-lg">
  {#if $user} 
    <Navbar/>
    <slot>  </slot>
  {:else}
    <Auth />
  {/if}
</div>

