<script>
  import { supabase } from '../supabase.js';
  import Auth from '../components/Auth.svelte';
  import {user} from '../stores/authStore.js';
  import "../app.css";
	import { loadTodos } from '../stores/todoStore.js';
  import Navbar from '../components/Navbar.svelte';

 // check if user is logged in
 const { data: { session }, } = await supabase.auth.getSession().then(async (session) => {
   if (session) {
     user.set(session.user);
     await loadTodos();
   }
   else {
     user.set(null);
   }
 });


</script>

<div class="container mx-auto my-6 max-w-lg">
  {#if $user} 
    <Navbar/>
    <slot>  </slot>
  {:else if !$user}
    <Auth />
  {/if}
</div>

