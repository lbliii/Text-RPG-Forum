<script>
  import { supabase } from '../supabase.js';
  import {Avatar, Card, Tooltip} from 'flowbite-svelte'

  export const post = {};
  import {deletePost, updatePost} from '../stores/postStore.js';
</script>

<main>
    <Card size="lg" padding="sm">
        <Avatar data-name="{post.character.first_name}" rounded>JL</Avatar>
        <Tooltip triggeredBy="[data-name]" on:show={e => name = e.target.dataset.name}>{name}</Tooltip>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        {post.content}
        </p>
    </Card>

</main>