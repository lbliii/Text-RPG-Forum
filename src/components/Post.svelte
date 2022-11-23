<script>
  import { supabase } from '../supabase.js';
  import {Avatar, Card, Tooltip, P} from 'flowbite-svelte'
  import {deletePost, updatePost} from '../stores/postStore.js';

  export let post
  
</script>


  <Card size="lg" padding="sm" class="my-2">
      <Avatar />
      <P class="my-2">{post.body}</P>
  </Card>

