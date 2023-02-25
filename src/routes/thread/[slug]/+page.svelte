<script>
  import {Heading, Badge} from 'flowbite-svelte'
  import { forumStore } from '../../../stores/forumStore.js';
  import { threadStore } from '../../../stores/threadStore.js';
  import { userStore } from '../../../stores/userStore.js';
  import Posts from '../../../components/Posts.svelte';
  import Thread from '../../../components/Thread.svelte';

  export let data;
  let thread = data

  async function loadComponentData() {
    await forumStore.fetchForum(thread.forum_id);
  }

  loadComponentData()

  $: $threadStore 

</script>

<section>
  <div class="text-center">
    <Heading tag="h1" class="my-3 text-white">{#if $threadStore.title}{$threadStore.title}{/if}</Heading>
    <Heading tag="h2" class="my-3 text-white">{#if $threadStore.description}{$threadStore.description}{/if}</Heading>
    {#await loadComponentData()}
      <Badge class="my-3">Loading...</Badge>
    {:then}
      <Badge class="my-3">{#if $forumStore.title}{$forumStore.title}{/if}</Badge>
    {/await}
  </div>

  <Thread thread={thread} />

  <Posts thread={thread} user={$userStore} />
</section>
