<script>
  import { threadStore } from '../stores/threadStore.js';
  import { accountStore } from '../stores/accountStore.js';
  import { Badge, Button, Heading, Input, Textarea } from 'flowbite-svelte';

  export let thread;
  export let edit;
  export let topic;

  let accountId;

  accountStore.subscribe( acc => {
    accountId = acc.id;
  });

  let title = '';
  let description = '';


  $: if (thread && !title && !description) {
    title = thread.title;
    description = thread.description;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (edit) {
      const updatedThread = {
        ...thread,
        title,
        description,
        user_id: accountId,
      };
      console.log("updatedThread", updatedThread)
      threadStore.updateThread(updatedThread);

    } else {
      const newThread = {
        title,
        description,
        user_id: accountId,
        topic_id: topic.id,
      };
      threadStore.addThread(topic.id, newThread);
    }
  };
</script>

<form on:submit={handleSubmit}>
  <Heading tag="h3">{edit ? 'Edit' : 'Create'} Thread</Heading>

  <Input
    type="text"
    placeholder="Title"
    bind:value={title}
  />

  <Textarea
    placeholder="Description"
    bind:value={description}
  />

  <Button type="submit">{edit ? 'Update' : 'Create'}</Button>
</form>