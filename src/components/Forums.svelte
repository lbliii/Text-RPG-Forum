<script>
  import { forumStore } from '../stores/forumStore.js';
  import { userStore } from '../stores/userStore.js';
  import { authStore } from '../stores/authStore.js';
  import { Button, ButtonGroup, Input, Modal, Card, P, Textarea } from 'flowbite-svelte';
  import { onMount } from 'svelte';

  let auth;
  let user;
  let newTopic = { title: '', description: '', image: '' };
  let creatingTopic = false;
  let editingTopic = false;
  let deletingTopic = false;
  let activeTopic = {};
  let sortedForumStore = [];

  onMount(async () => {
    user = await userStore.get();
    auth = await authStore.get();
    sortedForumStore = $forumStore.slice().sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  });

  $: admin = user && user.admin;

  function addTopic() {
    forumStore.addTopic({
      user_id: auth.id,
      ...newTopic
    });
    newTopic = { title: '', description: '' };
  }

  function updateTopic() {
    forumStore.updateTopic(activeTopic);
    editingTopic = false;
    activeTopic = {};
  }

  function removeTopic() {
    forumStore.removeTopic(activeTopic);
    deletingTopic = false;
    activeTopic = {};
  }

</script>


<section> 
  <h1 class="text-5xl font-bold text-white text-center my-6">Forums</h1>
  <div class="flex flex-row justify-end my-2">
    <ButtonGroup class="space-x-px" >
      {#if admin }
        <Button size="xs" color="green" on:click={() => creatingTopic = true}>Create Forum</Button>
      {/if}
    </ButtonGroup>
  </div>

  {#each sortedForumStore as topic}
    <section class="my-5">
      <Card size="lg" padding="sm" class="my-2" href={`/forum/${topic.id}`} img="{topic.image}">
        <h1 class="text-5xl font-bold dark:text-white text-center my-6">{topic.title}</h1>
        <P class="text-2xl font-bold dark:text-white text-center my-6">{topic.description}</P>
      </Card>
      <div class="text-right">
        {#if admin}
        <ButtonGroup class="space-x-px">
          <Button  color="light" size="xs" on:click={() => { activeTopic = topic; editingTopic = true; }}>Update</Button>
          <Button  color="red" size="xs" on:click={() => { activeTopic = topic; deletingTopic = true; }}>Remove</Button>
        </ButtonGroup>
        {/if}
      </div>
    </section>
  {/each}

</section>

<Modal bind:open={creatingTopic} title="Create Topic">
      <Input bind:value={newTopic.title} placeholder="Enter a new topic." class="my-2" />
      <Textarea bind:value={newTopic.description} id="description" name="description" placeholder="Enter a description here." class="my-2" />
      <Input bind:value={newTopic.image} placeholder="Enter an image url." class="my-2" />
      <Button color="green" on:click={addTopic}>Create</Button>
</Modal>


 <Modal bind:open={editingTopic} title="Edit Topic">
    <Input bind:value={activeTopic.title} />
    <Textarea bind:value={activeTopic.description} id="description" name="description" placeholder="Enter a description here." class="my-2" />
    <Input bind:value={activeTopic.image} placeholder="Enter an image url." class="my-2" />
    <Button on:click={updateTopic}>Update</Button>
  </Modal>

  <Modal bind:open={deletingTopic} title="Remove Topic">
    <Input bind:value={activeTopic.title} />
    <P>Are you sure you want to delete this topic?</P>
    <Button color="red" on:click={removeTopic}>Remove</Button>
  </Modal>

<!-- todo: fix the database logic to enable anyone with a profile of admin to edit/delete even if they didn't create the forum -->