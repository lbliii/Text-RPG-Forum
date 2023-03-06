<script>
  import { userStore } from '../../stores/userStore.js';
  import ForumsDetails from '../../components/forum/ForumsDetails.svelte';
  import ForumList from '../../components/forum/ForumList.svelte';
  import ForumCRUD from  '../../components/forum/ForumCRUD.svelte';
</script>

<main>
  <ForumsDetails />
  <ForumList user={$userStore}>
    <ForumCRUD action="create" user={$userStore} />
  </ForumList>
</main>
