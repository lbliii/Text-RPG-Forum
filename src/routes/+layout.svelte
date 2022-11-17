<script>
  import { user } from '../stores/authStore.js';
  import { supabase } from '../supabase.js';
  import Auth from '../components/Auth.svelte';
	import { loadTodos } from '../stores/todoStore.js';
  import Navbar from '../components/Navbar.svelte';
  import "../app.css";

 const { data, error } = await supabase.auth.getSession() 

  let session = data;
  $:if (session === null) {
    user.set(false);
  }
  $:if (session !== null) {
    user.set(true);
    loadTodos();
  }
  $:if (error) {
    console.log(error);
  }

</script>

<div class="container mx-auto my-6 max-w-lg">
  {#if $user} 
    <Navbar/>
    <slot>  </slot>
  {:else}
    <Auth />
  {/if}
</div>

