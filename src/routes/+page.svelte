 <script>
    import { userStore } from '../stores/userStore.js';
    import BookmarksList from '../components/BookmarksList.svelte';
    import SetupCheck from '../components/guide/SetupCheck.svelte';
    import ActivityCheck from '../components/guide/ActivityCheck.svelte';

   userStore.fetchUser()

 </script>

{#if $userStore}
    <SetupCheck user={$userStore} />
    <ActivityCheck user={$userStore} />
    <BookmarksList user={$userStore} />
{/if}
