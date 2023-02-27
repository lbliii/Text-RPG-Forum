<script>
    import { forumStore } from '../../../stores/forumStore.js';
    import ForumCRUD from '../../../components/ForumCRUD.svelte';
    import ForumDetails from '../../../components/ForumDetails.svelte';
    import ForumThreadList from '../../../components/ForumThreadList.svelte';

    $: $forumStore

</script>


<main >
    <ForumDetails forum={$forumStore} />
    <ForumCRUD forum={$forumStore} />
    <ForumThreadList forum={$forumStore} />
</main>
