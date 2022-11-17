<script>
  import { supabase } from '../supabase.js';
  import Auth from '../components/Auth.svelte';
  import {user} from '../stores/authStore.js';
  import "../app.css";
	import { loadTodos } from '../stores/todoStore.js';
  import Navbar from '../components/Navbar.svelte';



 user.set(supabase.auth.currentUser)
 supabase.auth.onAuthStateChange((event, session) => {
    user.set(session?.user)
    if (session?.user) {
      loadTodos()
    }
    else {
  
    }
  })

  console.log(user)

</script>

<div class="container mx-auto my-6 max-w-lg">
  {#if $user }
    <Navbar/>
    <slot>  </slot>
  {:else}
    <Auth />
  {/if}
</div>

