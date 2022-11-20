<script>
    import UserForm from '../../../components/UserForm.svelte';
    import User from '../../../components/User.svelte';
    import {users} from '../../../stores/userStore.js';
</script>

<main>
    <h1 class="text-3xl font-bold dark:text-white text-center">Your Profile</h1>
    <UserForm/>
</main>