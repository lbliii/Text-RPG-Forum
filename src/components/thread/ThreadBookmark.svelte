<script>
    import { userBookmarksStore } from '../../stores/userBookmarksStore';
    import { Bookmark } from 'svelte-heros-v2'
    import { fade } from 'svelte/transition';

    export let thread = {}
    export let user = {}
    let bookmark = false;

    $: if (thread.id !== undefined && user.user_id !== undefined) {
        userBookmarksStore.fetchUserBookmark(thread.id, user.user_id).then((data) => {
            bookmark = data
        })

    }

    function toggleBookmark() {
        if (bookmark) {
            userBookmarksStore.removeUserBookmark(thread.id, user.user_id)
        } else {
            userBookmarksStore.addUserBookmark(thread.id, user.user_id)
        }
        bookmark = !bookmark
    }
   
</script>

<div in:fade="{{ duration: 1100 }}">
    <Bookmark size="30" variation={bookmark ? 'solid' : 'outline'} class="cursor-pointer" on:click={(toggleBookmark)}/>
</div>
