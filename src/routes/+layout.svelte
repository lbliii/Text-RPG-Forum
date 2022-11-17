<script>
  import { user } from '../stores/authStore.js';
  import { supabase } from '../supabase.js';
  import Auth from '../components/Auth.svelte';
	import { loadTodos } from '../stores/todoStore.js';
  import Navbar from '../components/Navbar.svelte';
  import "../app.css";

 const { data, error } = supabase.auth.getSession() 

  let session = data;
  $:if (session === null || session === undefined) {
    console.log("There is no session.")
    user.set(false)
  }
  $:if (session !== null && session !== undefined) {
    console.log("There is a session.")
    user.set(true)
  }
  $:if (error) {
    console.log(error);
  }

  console.log(user )

</script>

<div class="container mx-auto my-6 max-w-lg">
  {#if $user} 
    <Navbar/>
    <slot>  </slot>
  {:else}
    <Auth />
  {/if}
</div>

