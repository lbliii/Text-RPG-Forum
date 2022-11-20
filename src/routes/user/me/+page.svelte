<script>
    import UserForm from '../../../components/UserForm.svelte';
    import {profile} from '../../../stores/userStore.js';
</script>

<main>
    <h1 class="text-3xl font-bold dark:text-white text-center">Your Profile</h1>
    <UserForm profile={profile}/>
</main>