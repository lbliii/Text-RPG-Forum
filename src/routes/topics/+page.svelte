<script>
    import {loadTopics, topics} from '../../stores/topicStore.js';
    import Topic from '../../components/Topic.svelte'
    import TopicMenu from '../../components/TopicMenu.svelte'
    
</script>

<main>

    <TopicMenu />
    
    <h1 class="text-4xl font-bold dark:text-white text-center my-6">Topics</h1>
    {#each $topics as topic}
        {#if topic.has_parent === false }
            <Topic topic={topic} />
        {/if}
    {/each}
</main>