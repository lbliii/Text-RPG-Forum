<script>
    import { userBookmarksStore } from '../stores/userBookmarksStore';
    import Thread from './thread/Thread.svelte';
    import { Heading, Card} from 'flowbite-svelte';

    export let user = {}

    

    $: if (user.user_id) {

        let threads;
        userBookmarksStore.fetchUserBookmarks(user.user_id)
    }

    $: console.log($userBookmarksStore)

</script>


<Heading tag="h2" class="mb-4 text-white">Bookmarks</Heading>


{#if $userBookmarksStore.length > 0}
    {#each $userBookmarksStore as bookmark}
        <Thread thread={bookmark} />
    {/each}
{:else}
    <Card size="lg" padding="md" class="mb-4">
        <p class="text-center">No bookmarks yet</p>
    </Card>
{/if}