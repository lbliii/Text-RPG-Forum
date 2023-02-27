<script>
  import { threadStore } from '../../../stores/threadStore.js';
  import { userStore } from '../../../stores/userStore.js';
  import Posts from '../../../components/Posts.svelte';
  import ThreadDetails from '../../../components/ThreadDetails.svelte';

  $: $threadStore

</script>

<main> 
  <ThreadDetails thread={$threadStore} />
  <Posts thread={$threadStore} user={$userStore} />
</main>
