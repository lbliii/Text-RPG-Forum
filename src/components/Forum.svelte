<script>
import { forumStore } from '../stores/forumStore.js';
import { Button, Input, Modal, Card, P } from 'flowbite-svelte';
import { account } from '../stores/accountStore.js';

let user = {};
$: user = $account;

let newTopic = '';
let editingTopic = false;
let activeTopic = {};

</script>

<section> 
    <Input bind:value={newTopic} placeholder="Enter a new topic" />
    <Button on:click={() => forumStore.addTopic({
        created_at: Date.now(),
        title: newTopic,
        user_id: user.id,
      })}>Add Topic</Button>

  {#each $forumStore as topic}
    <Card size="lg" padding="sm" class="my-2">
      <h2 class="text-4xl font-bold dark:text-white text-center my-6">{topic.title}</h2>
      <P>
        <Button on:click={() => forumStore.removeTopic(topic)}>Remove</Button>
        <Button on:click={() => { activeTopic = topic; editingTopic = true; }}>Update</Button>
      </P>
    </Card>

  {/each}

  <Modal bind:open={editingTopic} title="Edit Topic">
    <Input bind:value={activeTopic.title} />
    <Button on:click={() => {
      forumStore.updateTopic(activeTopic),
      editingTopic = false, 
      activeTopic = {}
      } }>Update</Button>
  </Modal>

</section>
