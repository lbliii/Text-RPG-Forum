<script>
    import { threadStore } from '../../stores/threadStore.js';
    import { forumStore } from '../../stores/forumStore.js';
    import { userStore } from '../../stores/userStore.js';
    import { Card, Badge, Heading } from 'flowbite-svelte';
    import ThreadCRUD from './ThreadCRUD.svelte';

    export let thread;
    
    async function loadComponentData() {
      await forumStore.fetchForum(thread.forum_id);
  }

  loadComponentData()

</script>

 <Card size="lg" padding="lg" class="my-6" color="green">
    {#await loadComponentData()}
      <Badge color="purple" class="my-3 w-fit">Loading...</Badge>
    {:then}
      <Badge color="purple" class="my-3 w-fit">{#if $forumStore.title}{$forumStore.title}{/if}</Badge>
    {/await} 

    <Heading tag="h2" class="my-3 ">{#if $threadStore.title}{$threadStore.title}{/if}</Heading>
    <Heading tag="h4" class="my-3">{#if $threadStore.description}{$threadStore.description}{/if}</Heading>

    <div class="flex justify-end">
      <ThreadCRUD thread={$threadStore} user={$userStore}/> 
    </div>
  </Card>