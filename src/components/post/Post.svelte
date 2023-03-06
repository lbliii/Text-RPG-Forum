<script>
import { fade } from 'svelte/transition';
import { Card, P, Badge } from 'flowbite-svelte';
import PostCharacterDetails from './PostCharacterDetails.svelte';
import PostCRUD from './PostCRUD.svelte';
import PostLikesCounter from './PostLikesCounter.svelte';
import PostShare from './PostShare.svelte';

export let thread;
export let user;
export let post;

</script>

<div in:fade="{{ duration: 1100 }}">

    <div class="flex flex-row {post.id % 2 === 0 ? 'justify-start -ml-1' : 'justify-end -mr-1'}">
        <PostCharacterDetails characterId={post.character_id} post={post} />
    </div>

    <Card size="lg" padding="md" class="-mt-20 mb-7">
    <div class="flex flex-row {post.id % 2 === 0 ? 'justify-end' : 'justify-start'}">
        <Badge color="green"> {new Date(post.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour:'numeric'  })}</Badge>
    </div>
    
    <P class="my-20 mx-2">{post.body}</P>

    <div class="flex flex-row justify-end space-x-3">
        <PostLikesCounter post={post} />
        <PostShare post={post} />
        <PostCRUD thread={thread} user={user} post={post} action="edit" />
    </div>
    

    </Card>
</div>
