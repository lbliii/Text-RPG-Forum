<script>
	import { threadStore } from '../../stores/threadStore.js';
	import { userStore } from '../../stores/userStore.js';
	import { Button, ButtonGroup, P, Modal, Input, Textarea, Dropdown, DropdownItem, Chevron } from 'flowbite-svelte';
	import { EllipsisHorizontalCircle } from 'svelte-heros-v2';
	import { goto } from '$app/navigation';

	export let thread = $threadStore;

	let openEditModal = false;
	let openDeleteModal = false;

	function handleEdit() {
		threadStore.editThread(thread);
		openEditModal = false;
		thread = $threadStore;
	}

	function handleDelete() {
		threadStore.removeThread(thread);
		openDeleteModal = false;
		goto(`/forum/${thread.forum_id}`);
	}
</script>

{#if $userStore.user_id === thread.user_id}
	<div class="flex flex-row justify-end items-center my-2">
		<EllipsisHorizontalCircle size="30" class="text-green-900 cursor-pointer"  />
		<Dropdown >
			<DropdownItem on:click={() => (openEditModal = true)}>Edit</DropdownItem>
			<DropdownItem  on:click={() => (openDeleteModal = true)} >Delete</DropdownItem>
		</Dropdown>
	</div>
{/if}

<Modal bind:open={openEditModal} title="Edit Thread">
	<form>
		<div class="mb-3">
			<label for="title" class="form-label">Title</label>
			<Input type="text" id="title" class="form-control" bind:value={thread.title} />
		</div>
		<div class="mb-3">
			<label for="description" class="form-label">Description</label>
			<Textarea id="description" class="form-control" bind:value={thread.description} />
		</div>
	</form>

	<ButtonGroup class="space-x-px">
		<Button size="xs" color="green" on:click={() => handleEdit()}>Save</Button>
		<Button size="xs" color="red" on:click={() => (openEditModal = false)}>Cancel</Button>
	</ButtonGroup>
</Modal>

<Modal bind:open={openDeleteModal} title="Delete {thread.title} Forum">
	<P>Are you sure you want to delete this thread?</P>
	<ButtonGroup class="space-x-px">
		<Button size="xs" color="red" on:click={() => handleDelete()}>Delete</Button>
		<Button size="xs" color="green" on:click={() => (openDeleteModal = false)}>Cancel</Button>
	</ButtonGroup>
</Modal>
