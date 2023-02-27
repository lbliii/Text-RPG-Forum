<script>
  import ForumList from '../../components/ForumList.svelte';
  import { userStore } from '../../stores/userStore.js';
</script>

<main>
  <h1 class="text-4xl font-bold text-white text-center my-6">Forums</h1>

  <ForumList user={$userStore} />
</main>
