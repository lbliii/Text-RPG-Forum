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


console.log(post.body)
</script>

<div in:fade="{{ duration: 1100 }}">

    <div class="flex flex-row {post.id % 2 === 0 ? 'justify-start -ml-1' : 'justify-end -mr-1'}">
        <PostCharacterDetails characterId={post.character_id} />
    </div>

    <Card size="lg" padding="md" class="-mt-20 mb-7">
    <div class="flex flex-row {post.id % 2 === 0 ? 'justify-end' : 'justify-start'}">
        <Badge color="green"> {new Date(post.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour:'numeric'  })}</Badge>
    </div>
    <section class="my-20">
        {#each post.body.split('\n') as paragraph}
            <P class="mx-2 my-4">{paragraph}</P>
        {/each}
    </section>

    <div class="flex flex-row justify-end space-x-3">
        <PostLikesCounter post={post} />
        <PostShare post={post} />
        <PostCRUD thread={thread} user={user} post={post} action="edit" />
    </div>
    

    </Card>
</div>
