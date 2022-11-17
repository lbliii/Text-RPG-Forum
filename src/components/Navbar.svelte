 <script>
   import { supabase } from '../supabase.js';

   const logout = () => {
      // get the session 
      const session = supabase.auth.getSession();
      const refresh_token = session.refresh_token;
      supabase.auth.signOut(refresh_token);
   }

 </script>

 <div class="my-4 flex justify-end">
    <button class="shadow-sm rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4" on:click={logout}>Log Out</button>

 </div>