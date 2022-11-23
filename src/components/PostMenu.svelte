<script>
  import {Button, Modal} from 'flowbite-svelte'
  import PostForm from '../components/PostForm.svelte'

  export let thread
  let createModal = false

</script>

<div class="flex flex-row justify-end my-2">

    <Button color="green" on:click={() => createModal = true}>Reply</Button>

</div>


<Modal bind:open={createModal} size="xs" autoclose={false}>
    <PostForm thread={thread} edit={false} />
</Modal>