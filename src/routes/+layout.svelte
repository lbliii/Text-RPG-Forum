<script>
  import { supabase } from '../supabase.js';
  import Auth from '../components/Auth.svelte';
  import {user} from '../stores/authStore.js';
  import "../app.css";
	import { loadTodos } from '../stores/todoStore.js';
  import Navbar from '../components/Navbar.svelte';

 // check if user is logged in
 const { data: { session }, } = await supabase.auth.getSession()
 const { activeUser } = session

if (activeUser) {
  user.set(activeUser)
  loadTodos()
} else {
  user.set(false)
}

</script>

<div class="container mx-auto my-6 max-w-lg">
  {#if $user} 
    <Navbar/>
    <slot>  </slot>
  {:else if !$user}
    <Auth />
  {/if}
</div>

