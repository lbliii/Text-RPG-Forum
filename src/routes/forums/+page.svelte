<script>
  import { userStore } from '../../stores/userStore.js';
  import ForumsDetails from '../../components/ForumsDetails.svelte';
  import ForumList from '../../components/ForumList.svelte';
</script>

<main>
  <ForumsDetails />
  <ForumList user={$userStore} />
</main>
