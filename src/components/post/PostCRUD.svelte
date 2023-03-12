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

	let postData = {};


	$: {
		if (user.user_id) {
			charactersStore.fetchCharacters(user.user_id);
		}

	}

	function handlePostCreate() {
		postStore.addPost({
			user_id: user.user_id,
			thread_id: thread.id,
			...postData
		});
		postData = {};
		modalOpen = false;
	}

	function handlePostUpdate() {
		postStore.editPost(postData);
		postData = {};
		modalOpen = false;
	}

	function handlePostDelete() {
		postStore.removePost(postData);
		postData = {};
		modalOpen = false;
	}
</script>

{#if action === 'create'}
	<Button size="xs" color="green" on:click={() => ((modalOpen = true), (modalTitle = 'Add a Post'))}>Add a Post</Button>
{:else if post.user_id === user.user_id}
	<EllipsisHorizontalCircle size="30" class="cursor-pointer" />
	<Dropdown>
		<DropdownItem
			on:click={() => (
				(modalOpen = true), (action = 'edit'), (modalTitle = 'Edit Post'), (postData = post)
			)}>Edit</DropdownItem
		>
		<DropdownItem
			on:click={() => (
				(modalOpen = true), (action = 'delete'), (modalTitle = 'Delete Post'), (postData = post)
			)}>Delete</DropdownItem
		>
	</Dropdown>
{/if}

<Modal bind:open={modalOpen} title={modalTitle}>
	{#if user.user_id}
	<div class="flex flex-row justify-between items-center">
		<select bind:value={postData.character_id} required class="h-fit">
			{#each $charactersStore as character}
				<option value={character.id}>{character.first_name} {character.last_name} </option>
			{/each}
		</select>
		{#if postData.character_id}
			<PostCharacterDetails characterId={postData.character_id} />
		{/if}
	</div>
	<Label for="body" class="mb-2 text-center">Write a Post Body</Label>
	<Textarea id="body" rows="10" bind:value={postData.body} placeholder={"Write a post from the POV of your selected character. It can be in first, second, or third person depending on your style/what you've agreed upon with your writing partner. Try to match at least 80% of the word count (WC) of the first post. "}/>
	{#if action === 'create'}
		<div> 
			<Button color="green" on:click={handlePostCreate}>Create</Button>
		</div>
	{:else if action === 'edit'}
		<Button color="green" on:click={handlePostUpdate}>Update</Button>
	{:else if action === 'delete'}
		<P>Are you sure you want to delete this post?</P>
		<Button color="red" on:click={handlePostDelete}>Delete</Button>
	{/if}
	{:else }
		<P>You must be logged in to create a post.</P>
	{/if}
</Modal>
