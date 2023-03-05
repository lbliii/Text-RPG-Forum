<script>
  import { forumStore } from '../../stores/forumStore.js';
  import { Button, ButtonGroup, P, Modal, Input, Textarea, Dropdown, DropdownItem } from 'flowbite-svelte';
  import { goto } from '$app/navigation';
  import { EllipsisHorizontalCircle } from 'svelte-heros-v2';

  export let modalOpen = false;
  export let modalTitle = '';
  export let action = '';
  export let forum = {};
  export let user = {};
  export let color = 'black';

  let forumData = {};

  function handleAction() {
    if (action === 'create') {
      forumStore.addForum(forumData);
    } else if (action === 'edit') {
      forumStore.editForum(forumData);
    } else if (action === 'delete') {
      forumStore.removeForum(forum);
      goto('/forums');
    }
	forumData = {};
    modalOpen = false;
  }
</script>

{#if user && user.admin && user.admin !== undefined}
	{#if action === 'create'}
		<Button size="xs" color="green" on:click={() => ((modalOpen = true), (modalTitle = 'Create Forum'))} >Create Forum</Button>
	{:else}

	<section class="flex justify-end">
		<EllipsisHorizontalCircle size="30" class="cursor-pointer" color={color}/>
		<Dropdown>
			<DropdownItem on:click={() => ((modalOpen = true), (action = 'edit'), (modalTitle = 'Edit Forum'), (forumData = forum))}>Edit</DropdownItem>
			<DropdownItem on:click={() => ((modalOpen = true), (action = 'delete'), (modalTitle = `Delete ${forum.title} Forum`))}>Delete</DropdownItem>
		</Dropdown>
	</section>
		
	{/if}
{/if}

<Modal bind:open={modalOpen} title={modalTitle}>
  {#if action === 'create' || action === 'edit'}
    <form>
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <Input type="text" id="title" class="form-control" bind:value={forumData.title} />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <Textarea id="description" class="form-control" bind:value={forumData.description} />
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">Image</label>
        <Input type="text" id="image" class="form-control" bind:value={forumData.image} />
      </div>
    </form>
  {/if}

  {#if action === 'delete'}
    <P>Are you sure you want to delete this forum?</P>
  {/if}

  <ButtonGroup class="space-x-px">
    <Button size="xs" color="green" on:click={handleAction}>{#if action === 'create'}Create{:else}Save{/if}</Button>
    <Button size="xs" color="red" on:click={() => (modalOpen = false)}>Cancel</Button>
  </ButtonGroup>
</Modal>
