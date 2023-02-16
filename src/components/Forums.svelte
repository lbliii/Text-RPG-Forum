<script>
  import { forumStore } from '../stores/forumStore.js';
  import { accountStore } from '../stores/accountStore.js';
  import { profileStore } from '../stores/profileStore.js';
  import { Button, ButtonGroup, CloseButton, Input, Modal, Card, P, Textarea } from 'flowbite-svelte';

  let user = {};
  let newTopic = { title: '', description: '', image: '' };
  let editingTopic = false;
  let deletingTopic = false;
  let activeTopic = {};

  $: user = $accountStore;

  let profile;

  profileStore.profile.subscribe(value => {
    profile = value;
  });

  $: sortedForumStore = $forumStore.slice().sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  function addTopic() {
    forumStore.addTopic({
      user_id: user.id,
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

  function isAdmin(profile) {
    return profile.admin === true;
  }


</script>

<section> 
  <h1 class="text-5xl font-bold dark:text-white text-center my-6">Forums</h1>

  {#each sortedForumStore as topic}
    <section class="my-5">
      <Card size="lg" padding="sm" class="my-2" href={`/forum/${topic.id}`} img="{topic.image}">
        <h1 class="text-5xl font-bold dark:text-white text-center my-6">{topic.title}</h1>
        <P class="text-2xl font-bold dark:text-white text-center my-6">{topic.description}</P>
      </Card>
      <div class="text-right">
        {#if isAdmin(profile)}
        <ButtonGroup class="space-x-px">
          <Button outline size="xs" on:click={() => { activeTopic = topic; editingTopic = true; }}>Update</Button>
          <Button outline size="xs" on:click={() => { activeTopic = topic; deletingTopic = true; }}>Remove</Button>
        </ButtonGroup>
        {/if}
      </div>
    </section>
  {/each}


  <Modal bind:open={editingTopic} title="Edit Topic">
    <Input bind:value={activeTopic.title} />
    <Textarea bind:value={activeTopic.description} id="description" name="description" placeholder="Enter a description here." class="my-2" />
    <Input bind:value={activeTopic.image} placeholder="Enter an image url." class="my-2" />
    <Button on:click={updateTopic}>Update</Button>
  </Modal>

  <Modal bind:open={deletingTopic} title="Remove Topic">
    <Input bind:value={activeTopic.title} />
    <P>Are you sure you want to delete this topic?</P>
    <Button on:click={removeTopic}>Remove</Button>
  </Modal>

  {#if isAdmin(profile)}

  <Card size="lg" padding="sm" class="my-2">
    <h1 class="text-5xl font-bold dark:text-white text-center my-6">Add a Forum</h1>
    <Input bind:value={newTopic.title} placeholder="Enter a new topic." class="my-2" />
    <Textarea bind:value={newTopic.description} id="description" name="description" placeholder="Enter a description here." class="my-2" />
    <Input bind:value={newTopic.image} placeholder="Enter an image url." class="my-2" />
    <Button color="green" on:click={addTopic}>Create</Button>
  </Card>
    
  {/if}

</section>
