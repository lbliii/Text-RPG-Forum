<script>
  import {Button, Modal} from 'flowbite-svelte'
  import CharacterForm from '../components/CharacterForm.svelte'

  let createModal = false
</script>

<div class="flex flex-row justify-end my-2">

    <Button color="green" on:click={() => createModal = true}>Create Character</Button>

</div>


<Modal bind:open={createModal} size="xs" autoclose={false}>
    <CharacterForm character="" edit={false} />
</Modal>