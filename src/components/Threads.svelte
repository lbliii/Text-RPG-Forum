<script>
  import { threadStore } from '../stores/threadStore.js';
  import { accountStore } from '../stores/accountStore.js';
  import { Button, ButtonGroup, CloseButton, Input, Modal, Card, P, Textarea } from 'flowbite-svelte';

  export let topic;
  let user = {};
  let newThread = { title: '', description: '' };
  let creatingThread = false;
  let editingThread = false;
  let deletingThread = false;
  let activeThread = {};
  let topicThreads;
  let sortAscending = true; // added for sorting

  $: user = $accountStore;

  $: threadStore.fetchThreads(topic.id)

  // added for sorting
  $: topicThreads = $threadStore.slice().sort((a, b) => {
    const sortValue = sortAscending ? 1 : -1;
    return sortValue * (new Date(b.last_updated) - new Date(a.last_updated));
  });

  function addThread() {
    threadStore.addThread(
     {
topic_id: topic.id,
      user_id: user.id,
      last_updated: new Date(),
      ...newThread
    });
    creatingThread = false;
    newThread = { title: '', description: '' };
  }

  function updateThread() {
    threadStore.updateThread(activeThread);
    editingThread = false;
    activeThread = {};
  }

  function removeThread() {
    threadStore.deleteThread(activeThread);
    deletingThread = false;
    activeThread = {};
  }

  function isOwner(thread) {
    return thread.user_id === user.id
  }

  // added for sorting
  function toggleSort() {
    sortAscending = !sortAscending;
  }

</script>

<section> 
  <div class="flex flex-row justify-end my-2">
    <ButtonGroup class="space-x-px" >
      <Button size="xs" outline on:click={toggleSort}>
        {sortAscending ? 'Newest' : 'Oldest'}
      </Button>
      <Button size="xs" color="green" on:click={() => creatingThread = true}>Create Thread</Button>
    </ButtonGroup>
  </div>

  {#each topicThreads as thread}
    <section class="my-5">
      <Card size="lg" padding="sm" class="my-2" href={`/thread/${thread.id}`}>
        <h1 class="text-5xl font-bold dark:text-white text-center my-6">{thread.title}</h1>
        <P class="text-2xl font-bold dark:text-white text-center my-6">{thread.description}</P>
      </Card>
      {#if isOwner(thread)}
        <div class="text-right">
          <ButtonGroup class="space-x-px">
            <Button outline on:click={() => { activeThread = thread; editingThread = true; }}>Edit</Button>
            <Button outline on:click={() => { activeThread = thread; deletingThread = true; }}>Delete</Button>
          </ButtonGroup>
        </div>
      {/if}
    </section>
  {/each}

  <Modal bind:open={creatingThread} title="Create Thread">
    <Input bind:value={newThread.title} placeholder="Enter a new thread" class="my-2" />
    <Textarea bind:value={newThread.description} placeholder="Enter a description" class="my-2" />
    <ButtonGroup class="space-x-px">
      <Button color="green" on:click={addThread}>Create</Button>
      <Button outline on:click={() => creatingThread = false}>Cancel</Button>
    </ButtonGroup>
  </Modal>

  <Modal bind:open={editingThread} title="Edit Thread">
    <Input bind:value={activeThread.title} placeholder="Enter a new thread" class="my-2" />
    <Textarea bind:value={activeThread.description} placeholder="Enter a description" class="my-2" />
    <ButtonGroup class="space-x-px">
      <Button color="green" on:click={updateThread}>Update</Button>
      <Button outline on:click={() => editingThread = false}>Cancel</Button>
    </ButtonGroup>
  </Modal>

  <Modal bind:open={deletingThread} title="Delete Thread">
    <P>Are you sure you want to delete this thread?</P>
    <ButtonGroup class="space-x-px">
      <Button color="red" on:click={removeThread}>Delete</Button>
      <Button outline on:click={() => deletingThread = false}>Cancel</Button>
    </ButtonGroup>
  </Modal>

</section>