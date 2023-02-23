<script>
	import { forumStore } from '../stores/forumStore.js';
	import { userStore } from '../stores/userStore.js';
	import { Button, ButtonGroup, P, Modal, Input, Textarea } from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	export let forum = $forumStore;

	let editForum = false;
	let deleteForum = false;

	function handleEdit() {
		forumStore.editForum(forum);
		editForum = false;
		forum = $forumStore;
	}

	function handleDelete() {
		forumStore.removeForum(forum);
		deleteForum = false;
		goto('/forums');
	}
</script>

{#if $userStore && $userStore.admin}
	<section class="flex justify-end">
		<ButtonGroup class="mb-3">
			<Button size="xs" on:click={() => (editForum = true)} class="btn btn-primary">Edit</Button>
			<Button size="xs" color="red" on:click={() => (deleteForum = true)} class="btn btn-danger"
				>Delete</Button
			>
		</ButtonGroup>
	</section>
{/if}

<Modal bind:open={editForum} title="Edit Forum">
	<form>
		<div class="mb-3">
			<label for="title" class="form-label">Title</label>
			<Input type="text" id="title" class="form-control" bind:value={forum.title} />
		</div>
		<div class="mb-3">
			<label for="description" class="form-label">Description</label>
			<Textarea id="description" class="form-control" bind:value={forum.description} />
		</div>
		<div class="mb-3">
			<label for="image" class="form-label">Image</label>
			<Input type="text" id="image" class="form-control" bind:value={forum.image} />
		</div>
	</form>

	<ButtonGroup class="space-x-px">
		<Button size="xs" color="green" on:click={() => handleEdit()}>Save</Button>
		<Button size="xs" color="red" on:click={() => (editForum = false)}>Cancel</Button>
	</ButtonGroup>
</Modal>

<Modal bind:open={deleteForum} title="Delete {forum.title} Forum">
	<P>Are you sure you want to delete this forum?</P>
	<ButtonGroup class="space-x-px">
		<Button size="xs" color="red" on:click={() => handleDelete()}>Delete</Button>
		<Button size="xs" color="green" on:click={() => (deleteForum = false)}>Cancel</Button>
	</ButtonGroup>
</Modal>
