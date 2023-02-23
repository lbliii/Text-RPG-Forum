<script>
  import {Heading, Badge} from 'flowbite-svelte'
  import { forumStore } from '../../../stores/forumStore.js';
  import { userStore } from '../../../stores/userStore.js';
  import Posts from '../../../components/Posts.svelte';


  export let data;
  let thread = data

  async function loadForumDetails() {
    return await forumStore.fetchForum(thread.forum_id);
  }

  loadForumDetails()


</script>

<section>
  <div class="text-center">
    <Heading tag="h1" class="my-3 text-white">{#if thread.title}{thread.title}{/if}</Heading>
    {#await loadForumDetails()}
      <Badge class="my-3">Loading...</Badge>
    {:then forum}
      <Badge class="my-3">{#if forum.title}{forum.title}{/if}</Badge>
    {/await}

  </div>
  <Posts thread={thread} user={$userStore} />
</section>
