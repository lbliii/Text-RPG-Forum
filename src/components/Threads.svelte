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

  $: user = $accountStore;

  $: threadStore.fetchThreads(topic.id)

  function addThread() {
    threadStore.addThread(
     {
topic_id: topic.id,
      user_id: user.id,
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

</script>

<section> 
  <div class="flex flex-row justify-end my-2">
    <Button color="green" on:click={() => creatingThread = true}>Create Thread</Button>
  </div>

  {#each $threadStore as thread}
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

  <Modal bind:open={creatingThread}>
    <Input bind:value={newThread.title} placeholder="Enter a new thread" class="my-2" />
    <Textarea bind:value={newThread.description} id="description" name="description" placeholder="Enter a description here." class="my-2" />
    <Button color="green" on:click={addThread}>Add Thread</Button>
  </Modal>

  <Modal bind:open={editingThread} title="Edit Thread">
    <Input bind:value={activeThread.title} />
    <Textarea bind:value={activeThread.description} id="description" name="description" placeholder="Enter a description here." class="my-2" />
    <Button on:click={updateThread}>Update</Button>
  </Modal>

  <Modal bind:open={deletingThread} title="Delete Thread">
    <Input bind:value={activeThread.title} />
    <P>Are you sure you want to delete this thread?</P>
    <Button on:click={removeThread}>Delete</Button>
  </Modal>
</section>