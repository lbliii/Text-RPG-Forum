<script>
  import { threadStore } from '../../../stores/threadStore.js';
  import { userStore } from '../../../stores/userStore.js';
  import PostList from '../../../components/post/PostList.svelte';
  import PostCRUD from '../../../components/post/PostCRUD.svelte';
  import ThreadDetails from '../../../components/ThreadDetails.svelte';

  $: $threadStore

</script>

<main> 
  <ThreadDetails thread={$threadStore} />
  <PostCRUD thread={$threadStore} user={$userStore} action="create" />
  <PostList thread={$threadStore} user={$userStore} />
</main>
