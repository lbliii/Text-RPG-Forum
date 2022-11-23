<script>
  import {Button, Modal} from 'flowbite-svelte'
  import TopicForm from '../components/TopicForm.svelte'

  let createModal = false
</script>

<div class="flex flex-row justify-end my-2">

    <Button color="green" on:click={() => createModal = true}>Create Topic</Button>

</div>


<Modal bind:open={createModal} size="xs" autoclose={false}>
    <TopicForm topic="" edit={false} />
</Modal>