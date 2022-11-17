<script>
  import { supabase } from '../supabase.js';
  import Auth from '../components/Auth.svelte';
  import {user} from '../stores/authStore.js';
  import "../app.css";
	import { loadTodos } from '../stores/todoStore.js';
  import Navbar from '../components/Navbar.svelte';

  console.log(supabase.auth.getUser())
  user.set(supabase.auth.getUser())
  supabase.auth.onAuthStateChange((_, session) => {
    user.set(session?.user)
    if (session?.user) {
      console.log('User is signed in')
      loadTodos()
    } else {
      console.log('User is not signed in')
    }
  })
</script>

<div class="container mx-auto my-6 max-w-lg">
  {#if $user}
    <Navbar/>
    <slot>  </slot>
  {:else}
    <Auth />
  {/if}
</div>