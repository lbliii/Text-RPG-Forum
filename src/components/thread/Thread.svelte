<script>
import { fade } from 'svelte/transition';
import { Card, P, Badge, Heading } from 'flowbite-svelte';
import ThreadCharacterDetails from './ThreadCharacterDetails.svelte';

export let thread;

</script>


{#if thread.id !== undefined}
    <div in:fade="{{ duration: 1100 }}">
        <Card size="lg" padding="sm" img={thread.image} href={`/thread/${thread.id}`} class="my-4">
            <div class="flex flex-col">
                <Badge color="green" class="w-fit"> {new Date(thread.last_updated).toLocaleString('en-US', { month: 'short', day: 'numeric', hour:'numeric'  })}</Badge>
                <Heading tag="h3" class="my-2">{thread.title}</Heading>
                {#if thread.description}
                    <P>{thread.description}</P>
                {/if}
            </div>
                
            <ThreadCharacterDetails thread={thread}  />
        </Card>
    </div>
{/if}