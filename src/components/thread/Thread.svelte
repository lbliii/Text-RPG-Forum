<script>
import { fade } from 'svelte/transition';
import { Card, P, Badge, Heading } from 'flowbite-svelte';
import { forumStore } from '../../stores/forumStore.js';
import ThreadCharacterDetails from './ThreadCharacterDetails.svelte';
import ThreadLikesCounter from './ThreadLikesCounter.svelte';
import ThreadShare from './ThreadShare.svelte';

export let thread;
export let displayForumTitle = false;

async function fetchForumTitle (id) {
        return forumStore.fetchForum(id)
   }

</script>


{#if thread !== undefined}
    <div in:fade="{{ duration: 1100 }}">
        <Card size="lg" padding="sm" img={thread.image} href={`/thread/${thread.id}`} class="my-4">
            {#if displayForumTitle}
                {#await fetchForumTitle(thread.forum_id) then forum}
                    <Badge color="purple" class="mb-2 w-fit">
                        {forum.title}
                    </Badge>
                {/await}
            {/if}
            
            <div class="flex flex-col">
                <Badge color="green" class="w-fit"> {new Date(thread.last_updated).toLocaleString('en-US', { month: 'short', day: 'numeric', hour:'numeric'  })}</Badge>
                <Heading tag="h3" class="my-2">{thread.title}</Heading>
                {#if thread.description}
                    <P>{thread.description}</P>
                {/if}
            </div>
                
            <div class="flex items-center justify-end">
                
                <ThreadCharacterDetails thread={thread} />

                <div class="flex items-center space-x-3 ml-3">
                    <ThreadLikesCounter thread={thread} />
                    <ThreadShare thread={thread} />
                </div>
            </div>
        </Card>
    </div>
{/if}