<script>
import { forumStore } from '../stores/forumStore.js';
import { Button, ButtonGroup, CloseButton, Input, Modal, Card, P, Textarea } from 'flowbite-svelte';
import { accountStore } from '../stores/accountStore.js';

let user = {};
$: user = $accountStore;

let newTopic = {};
let editingTopic = false;
let deletingTopic = false;
let activeTopic = {};

</script>

<section> 

  <Card size="lg" padding="sm" class="my-2">
    <Input bind:value={newTopic.title} placeholder="Enter a new topic" class="my-2" />
    <Textarea type="text" bind:value={newTopic.description} id="description" name="description" placeholder="Enter a description here." class="my-2" />
    <Button on:click={() => {forumStore.addTopic({
      user_id: user.id,
      ...newTopic
      }),
      newTopic = {}
      }}>Add Topic</Button>
  </Card>

  {#each $forumStore as topic}
    <section class="my-5">
      <Card size="lg" padding="sm" class="my-2" href="/topic/{topic.id}">
        <h1 class="text-5xl font-bold dark:text-white text-center my-6">{topic.title}</h1>
        <P class="text-2xl font-bold dark:text-white text-center my-6">{topic.description}</P>
      </Card>
      <div class="text-right">
        <ButtonGroup class="space-x-px">
          <Button outline  on:click={() => { activeTopic = topic; editingTopic = true; }}>Update</Button>
          <Button outline  on:click={() => {activeTopic = topic; deletingTopic = true;}}>Remove</Button>
        </ButtonGroup>
      </div>
    </section>
  {/each}

  <Modal bind:open={editingTopic} title="Edit Topic">
    <Input bind:value={activeTopic.title} />
    <Textarea type="text" bind:value={newTopic.description} id="description" name="description" placeholder="Enter a description here." class="my-2" />
    <Button on:click={() => {
      forumStore.updateTopic(activeTopic),
      editingTopic = false, 
      activeTopic = {}
      } }>Update</Button>
  </Modal>

  <!-- create a modal for removingTopic -->

  <Modal bind:open={deletingTopic} title="Remove Topic">
    <Input bind:value={activeTopic.title} />
    <P>Are you sure you want to delete this topic?</P>
    <Button on:click={() => {
    forumStore.removeTopic(activeTopic),
    deletingTopic = false,
    activeTopic = {}
    }}>Remove</Button>
  </Modal>

</section>
