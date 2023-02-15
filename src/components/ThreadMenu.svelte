<script>
  import {Button, Modal} from 'flowbite-svelte'
  import ThreadForm from '../components/ThreadForm.svelte'

  export let topic;
  let createModal = false
</script>

<div class="flex flex-row justify-end my-2">

    <Button color="green" on:click={() => createModal = true}>Create Thread</Button>

</div>


<Modal bind:open={createModal} size="xs" autoclose={false}>
    <ThreadForm topic={topic} thread="" edit={false} />
</Modal>