<script>
  import { user } from '../stores/authStore.js';
  import { supabase } from '../supabase.js';
  import Auth from '../components/Auth.svelte';
	import { loadTodos } from '../stores/todoStore.js';
  import Navbar from '../components/Navbar.svelte';
  import "../app.css";

 user.set(supabase.auth.getUser())

  supabase.auth.onAuthStateChange(( _, session) => {
      user.set(session?.user);
      if(session?.user){
          loadTodos();
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

