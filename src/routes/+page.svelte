 <script>
    import { userStore } from '../stores/userStore.js';
    import BookmarksList from '../components/BookmarksList.svelte';
    import Onboarding from '../components/Onboarding.svelte';

    userStore.fetchUser()

 </script>

    <Onboarding user={$userStore} />
    <BookmarksList user={$userStore} />

