<script>
  import { threadStore } from '../stores/threadStore.js';
  import { Button, ButtonGroup, Card, Heading, P, Modal, Input, Textarea } from 'flowbite-svelte';
  import { writable } from 'svelte/store';

  export let forum;
  export let user;
  const newThread = writable({ title: '', description: '', image: '' });
  let searchTerm = "";
  let addThread = false;


  $: threadStore.fetchThreads(forum.id)
    

  console.log($threadStore)
</script>


<section>

  <div class="flex flex-row justify-end my-2">
    <ButtonGroup class="space-x-px">
      <Button size="xs" color="green" on:click={() => addThread = true}> Create Thread</Button>
    </ButtonGroup>
  </div>
    <div class="flex justify-end items-center my-2">
        <input type="text" placeholder="Search threads" bind:value={searchTerm} class="border border-gray-400 rounded-md p-2 w-1/3" />
    </div>

    {#if $threadStore && $threadStore.length > 0}
      {#each $threadStore as thread}
        <div class="my-2">
            <Card size="lg" padding="sm" img="{thread.image}" href={`/thread/${thread.id}`}>
            <Heading size="md" class="text-center">{thread.title}</Heading>
            {#if thread.description}
              <P class="text-center">{thread.description}</P>
            {/if}
            </Card>
        </div>
      {/each}
    {/if}
</section>

<Modal bind:open={addThread} title="Create Thread">
  <Input bind:value={$newThread.title} placeholder="Enter a new topic." class="my-2" />
  <Textarea bind:value={$newThread.description} id="description" name="description" placeholder="Enter a description here." class="my-2" />
  <Input bind:value={$newThread.image} placeholder="Enter an image url." class="my-2" />
  <Button color="green" on:click={createThread}>Create</Button>
</Modal>

