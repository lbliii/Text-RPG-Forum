<script>
import { forumStore } from '../stores/forumStore.js';
import { Button, Input, Modal, Card, P} from 'flowbite-svelte';
import { account } from '../stores/accountStore.js';

let user;

$: user = $account;

let newTopic = '';
let editingTopic = false;
let activeTopic = null;

const handleAddTopic = () => {
  forumStore.addTopic({
    created_at: Date.now(),
    title: newTopic,
    user_id: user?.id,
  });

  newTopic = '';
};

const handleUpdateTopic = () => {
  activeTopic = {
    ...activeTopic,
    title: activeTopic.title,
  };

  forumStore.updateTopic(activeTopic);

  editingTopic = false;
  activeTopic = null;
};
</script>

<section> 
    <Input bind:value={newTopic} placeholder="Enter a new topic" />
    <Button on:click={handleAddTopic}>Add Topic</Button>

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
    <Button on:click={handleUpdateTopic}>Update</Button>
  </Modal>
</section>