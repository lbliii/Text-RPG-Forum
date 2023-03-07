 <script>
    import { userStore } from '../stores/userStore.js';
    import BookmarksList from '../components/BookmarksList.svelte';
    import SetupCheck from '../components/guide/SetupCheck.svelte';

    userStore.fetchUser()

 </script>

    <SetupCheck user={$userStore} />
    <BookmarksList user={$userStore} />

