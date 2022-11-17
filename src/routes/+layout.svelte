<script>
  import { supabase } from '../supabase.js';
  import Auth from '../components/Auth.svelte';
  import {user} from '../stores/authStore.js';
  import "../app.css";
	import { loadTodos } from '../stores/todoStore.js';
  import Navbar from '../components/Navbar.svelte';

 // check if user is logged in
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      user.set(session.user);
      loadTodos(session.user.id);
    } else {
      user.set(null);
    }
  });

</script>

<div class="container mx-auto my-6 max-w-lg">
  {#if $user} 
    <Navbar/>
    <slot>  </slot>
  {:else}
    <Auth />
  {/if}
</div>

