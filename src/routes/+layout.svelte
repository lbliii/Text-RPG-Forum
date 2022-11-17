<script>
  import { supabase } from '../supabase.js';
  import Auth from '../components/Auth.svelte';
  import {user} from '../stores/authStore.js';
  import "../app.css";
	import { loadTodos } from '../stores/todoStore.js';
  import Navbar from '../components/Navbar.svelte';

  $: console.log($user)

 // check if user is logged in
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN') {
      user.set(session.user);
      loadTodos();
    }
    if (event === 'SIGNED_OUT') {
      console.log('signed out');
      user.set(false);
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

