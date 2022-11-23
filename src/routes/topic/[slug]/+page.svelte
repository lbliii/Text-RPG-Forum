<script>
    import ThreadMenu from '../../../components/ThreadMenu.svelte';
    import { threads } from '../../../stores/threadStore.js';
    import Thread from '../../../components/Thread.svelte';
</script>


<main>
    <ThreadMenu />

    {#each $threads as thread}

        <Thread thread={thread} />
    
    {/each}
</main>
