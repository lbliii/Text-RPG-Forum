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

    function addBookmark() {
        userBookmarksStore.addUserBookmark(thread.id, user.user_id)
        bookmark = true
    }

    function removeBookmark() {
        userBookmarksStore.removeUserBookmark(thread.id, user.user_id)
        bookmark = false
    }
   
    
</script>

<div in:fade="{{ duration: 1100 }}">
    {#if bookmark}
        <Bookmark size="30" variation="solid" class="cursor-pointer" on:click={(removeBookmark)}/>
    {:else }
        <Bookmark size="30" class="cursor-pointer" on:click={(addBookmark)}/>
    {/if}
</div>

