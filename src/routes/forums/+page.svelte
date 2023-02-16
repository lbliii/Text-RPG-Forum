<script>
    import Forums from '../../components/Forums.svelte'
    import { authStore } from '../../stores/authStore.js'
    import { userStore } from '../../stores/userStore.js'

    $: auth = $authStore;
    $: user = $userStore;
    
</script>

<main>
    
    <Forums auth={auth} user={user}/>

</main>