<script>
    import { Avatar, Badge, Button, Card, Heading, Hr, Modal, P } from 'flowbite-svelte';
    import ThreadMenu from '../../../components/ThreadMenu.svelte';
    import { threadStore } from '../../../stores/threadStore.js';
    import Thread from '../../../components/Thread.svelte';


    export let data;

    let topic = data;
    let topicThreads = [];

    $: threadStore.loadThreads(topic.id).then(threads => {
        topicThreads = threads;
        console.log(threads)
    }); 



</script>


<main>
    <ThreadMenu topic={topic} /> 

    <Heading tag="h1" class="mb-2">{topic.title}</Heading>


    {#each topicThreads as thread}

        <Thread thread={thread} />
    
    {/each}
</main>
