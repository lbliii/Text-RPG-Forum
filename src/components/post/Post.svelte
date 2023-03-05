<script>
import { Card, P, Badge } from 'flowbite-svelte';
import PostCharacterDetails from './PostCharacterDetails.svelte';
import PostCRUD from './PostCRUD.svelte';
import { fade } from 'svelte/transition';

export let thread;
export let user;
export let post;
export let sort;
export let margin;


 
</script>

<div in:fade="{{ duration: 1100 }}" class="{margin}">

    {#if post.character_id}
    <PostCharacterDetails characterId={post.character_id} post={post} />
    {/if}

    <Card size="lg" padding="md" class="mt-4 mb-7">
    <div class="flex flex-row {post.id % 2 === 0 ? 'justify-end' : 'justify-start'}">
        <Badge color="green"> {new Date(post.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour:'numeric'  })}</Badge>
    </div>
    
    <P class="my-10">{post.body}</P>

    <PostCRUD thread={thread} user={user} post={post} action="edit" />

    </Card>
</div>
