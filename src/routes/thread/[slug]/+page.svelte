<script>
  import {Heading, Badge, Card} from 'flowbite-svelte'
  import { forumStore } from '../../../stores/forumStore.js';
  import { threadStore } from '../../../stores/threadStore.js';
  import { userStore } from '../../../stores/userStore.js';
  import Posts from '../../../components/Posts.svelte';
  import ThreadCRUD from '../../../components/ThreadCRUD.svelte';

  export let data;
  let thread = data

  async function loadComponentData() {
    await forumStore.fetchForum(thread.forum_id);
  }

  loadComponentData()

  $: $threadStore 

</script>

<section> 

  <Card size="lg" padding="lg" class="my-6" color="green">
    {#await loadComponentData()}
      <Badge color="purple" class="my-3 w-fit">Loading...</Badge>
    {:then}
      <Badge color="purple" class="my-3 w-fit">{#if $forumStore.title}{$forumStore.title}{/if}</Badge>
    {/await} 

    <Heading tag="h2" class="my-3 ">{#if $threadStore.title}{$threadStore.title}{/if}</Heading>
    <Heading tag="h4" class="my-3">{#if $threadStore.description}{$threadStore.description}{/if}</Heading>

    <ThreadCRUD thread={thread} />
    
  </Card>
  
  <Posts thread={thread} user={$userStore} />
</section>
