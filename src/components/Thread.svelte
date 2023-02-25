<script>
	import { threadStore } from '../stores/threadStore.js';
	import { userStore } from '../stores/userStore.js';
	import { Button, ButtonGroup, P, Modal, Input, Textarea } from 'flowbite-svelte';
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
	<section class="flex justify-end">
		<ButtonGroup class="mb-3">
			<Button size="xs" on:click={() => (openEditModal = true)} class="btn btn-primary">Edit</Button>
			<Button size="xs" color="red" on:click={() => (openDeleteModal = true)} >Delete</Button>
		</ButtonGroup>
	</section>
{/if}

<Modal bind:open={openEditModal} title="Edit Forum">
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
