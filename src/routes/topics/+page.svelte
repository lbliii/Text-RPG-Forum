<script>
    import {topics} from '../../stores/topicStore.js';
    import Topic from '../../components/Topic.svelte'
</script>

<main class="m-2">
    <h1 class="text-4xl font-bold dark:text-white text-center my-6">Topics</h1>
    {#each $topics as topic}
        <Topic topic={topic} />
    {/each}
</main>