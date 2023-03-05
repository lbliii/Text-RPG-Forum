<script>
import { Card, P, Badge } from 'flowbite-svelte';
import PostCharacterDetails from './PostCharacterDetails.svelte';
import PostCRUD from './PostCRUD.svelte';

export let thread;
export let user;
export let post;
export let sort;
 
</script>

 
			
{#if !sort}
    {#key post.id}
        <PostCharacterDetails characterId={post.character_id} {post} />
    {/key}
{/if}

<Card size="lg" padding="md" class="mt-4 mb-7" >
    <div class="flex flex-row {post.id % 2 === 0 ? 'justify-end' : 'justify-start'}">
        <Badge color="green"> {new Date(post.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour:'numeric'  })}</Badge>
        
    </div>
    
    <P class="my-10">{post.body}</P>

    <PostCRUD thread={thread} user={user} post={post} action="edit" />

</Card>

{#if sort}
    {#key post.id}
        <PostCharacterDetails characterId={post.character_id} {post} />
    {/key}
{/if}