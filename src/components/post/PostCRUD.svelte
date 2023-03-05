<script>
	import { Button, Modal, P, Textarea, Dropdown, DropdownItem, Label } from 'flowbite-svelte';
	import { charactersStore } from '../../stores/charactersStore.js';
	import { postStore } from '../../stores/postStore.js';
	import PostCharacterDetails from './PostCharacterDetails.svelte';
	import { EllipsisHorizontalCircle } from 'svelte-heros-v2';

	export let modalOpen = false;
	export let modalTitle = '';
	export let action = '';
	export let post = {};
	export let user = {};
	export let thread = {};

	let newPost = {};
	let activePost = {};

	$: {
		if (user.user_id) {
			charactersStore.fetchCharacters(user.user_id);
		}
	}

	function handlePostCreate() {
		postStore.addPost({
			user_id: user.user_id,
			thread_id: thread.id,
			...newPost
		});
		newPost = {};
		modalOpen = false;
	}

	function handlePostUpdate() {
		postStore.editPost(activePost);
		activePost = {};
		modalOpen = false;
	}

	function handlePostDelete() {
		postStore.removePost(activePost);
		activePost = {};
		modalOpen = false;
	}
</script>

{#if action === 'create'}
	<Button size="xs" color="green" on:click={() => ((modalOpen = true), (modalTitle = 'Add a Post'))}
		>Add a Post</Button
	>
{:else if post.user_id === user.user_id}
	<div class="flex  justify-end">
		<EllipsisHorizontalCircle size="30" class="cursor-pointer" />
		<Dropdown>
			<DropdownItem
				on:click={() => (
					(modalOpen = true), (action = 'edit'), (modalTitle = 'Edit Post'), (activePost = post)
				)}>Edit</DropdownItem
			>
			<DropdownItem
				on:click={() => (
					(modalOpen = true), (action = 'delete'), (modalTitle = 'Delete Post'), (activePost = post)
				)}>Delete</DropdownItem
			>
		</Dropdown>
	</div>
{/if}

<Modal bind:open={modalOpen} title={modalTitle}>
	{#if action === 'create'}
		{#if newPost.character_id}
			<PostCharacterDetails characterId={newPost.character_id} />
		{/if}
		<select bind:value={newPost.character_id} required>
			{#each $charactersStore as character}
				<option value={character.id}>{character.first_name} {character.last_name} </option>
			{/each}
		</select>
		<Label for="body" class="mb-2">Write a Post Body</Label>
		<Textarea id="body" rows="10" bind:value={newPost.body} />
		<div>
			<Button color="green" on:click={handlePostCreate}>Create</Button>
		</div>
	{:else if action === 'edit'}
		{#if activePost.character_id}
			<PostCharacterDetails characterId={activePost.character_id} />
		{/if}
		<select bind:value={activePost.character_id} required>
			{#each $charactersStore as character}
				<option value={character.id}>{character.first_name} {character.last_name}</option>
			{/each}
		</select>
		<Textarea bind:value={activePost.body} />
		<Button color="green" on:click={handlePostUpdate}>Update</Button>
	{:else if action === 'delete'}
		<P>Are you sure you want to delete this post?</P>
		<Button color="red" on:click={handlePostDelete}>Delete</Button>
	{/if}
</Modal>
