<script>
    import { forumStore } from '../../../stores/forumStore.js';
    import { userStore } from '../../../stores/userStore.js';
    import ForumCRUD from '../../../components/forum/ForumCRUD.svelte';
    import ForumDetails from '../../../components/forum/ForumDetails.svelte';
    import ThreadList from '../../../components/thread/ThreadList.svelte';
    import ThreadCRUD from '../../../components/thread/ThreadCRUD.svelte';

    $: $forumStore

</script>


<main>
    <ForumDetails forum={$forumStore}>
        <ForumCRUD color="white" forum={$forumStore} user={$userStore} />
    </ForumDetails>
    <ThreadList forum={$forumStore}> 
        <ThreadCRUD forum={$forumStore} user={$userStore} action="create" />
    </ThreadList>
</main>
