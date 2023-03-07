<script>
    import { userBookmarksStore } from '../stores/userBookmarksStore';
    import { Bookmark } from 'svelte-heros-v2'
    import Thread from './thread/Thread.svelte';
    import { Heading, Card, P} from 'flowbite-svelte';
    import { fade } from 'svelte/transition';

    export let user = {}

    $: if (user.user_id) {
        userBookmarksStore.fetchUserBookmarks(user.user_id)
    }

</script>

<div in:fade="{{ duration: 1100 }}"> 
    <Heading tag="h2" class="my-6 text-white flex items-center"><Bookmark size="30" class="inline-flex mr-3"/> Bookmarks  </Heading>

    {#if $userBookmarksStore.length > 0}
    <div class="mx-3">
        {#each $userBookmarksStore as bookmark}
            <Thread thread={bookmark} />
        {/each}
    </div>
    {:else}
        <Card size="lg" padding="md" class="mb-4">
            <P size="xl" class="mb-3 font-semibold">Your bookmarks are as empty as ghost town. 👻 </P>
            <P>Give that <Bookmark size="30"color="green" class="inline-flex"/> button a clickaroo next time you stumble upon a thread that tickles your fancy, and watch as it magically appears in this nifty list of bookmarks.</P>
        </Card>
    {/if}
</div>
