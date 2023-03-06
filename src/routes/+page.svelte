 <script>
    import { userStore } from '../stores/userStore.js';
    import BookmarksList from '../components/BookmarksList.svelte';

    userStore.fetchUser()

 </script>


    <BookmarksList user={$userStore} />
