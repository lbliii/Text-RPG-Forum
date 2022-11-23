<script>
    import ThreadMenu from '../../../components/ThreadMenu.svelte';
    import { threads } from '../../../stores/threadStore.js';
    import Thread from '../../../components/Thread.svelte';

    export let data;
    let topic = data;
</script>


<main>
    <ThreadMenu />

    {topic.title}


    {#each $threads as thread}

        <Thread thread={thread} />
    
    {/each}
</main>
