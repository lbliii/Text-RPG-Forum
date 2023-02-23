<script>
import { Button, ButtonGroup, Modal, Card, P, Textarea } from 'flowbite-svelte';
import { charactersStore } from '../stores/charactersStore.js';
import { postStore } from '../stores/postStore.js';

export let thread;
export let user;

let sortAscending = true;
let createModal = false;
let newPost = {};
let editModal = false;
let activePost = {};
let deleteModal = false;

$: {
	
	if (user.user_id) {
		charactersStore.fetchCharacters(user.user_id);
	} 
}

function toggleSort() {
		sortAscending = !sortAscending;
	}

function handlePostCreate() {
		
		postStore.addPost({
			user_id: user.user_id,
			thread_id: thread.id,
			...newPost
		})

		
		createModal = false;
	}


</script>

<section>
	<div class="flex flex-row justify-end my-2">
		<ButtonGroup class="space-x-px">
			<Button size="xs" color="light" on:click={toggleSort}>
				{sortAscending ? 'Newest' : 'Oldest'}
			</Button>
			<Button size="xs" color="green" on:click={() => (createModal = true)}>Create Post</Button>
		</ButtonGroup>
	</div>
	
</section>

<Modal bind:open={createModal} title="Add a Post to: {thread.title}.">

	{#if $charactersStore }
		<select bind:value={newPost.character_id} required>
			{#each $charactersStore as character}
				<option value={character.id}>{character.first_name} {character.last_name}</option>
			{/each}
		</select>
	{/if}

	<Textarea bind:value={newPost.body} />
	<Button on:click={handlePostCreate}>Create</Button>
</Modal>

	<Modal bind:open={editModal} title="Edit Post">
		<Textarea bind:value={activePost.body} />
		<Button on:click={updatePost}>Update</Button>
	</Modal>

	<Modal bind:open={deleteModal} title="Delete Post">
		<P>Are you sure you want to delete this post?</P>
		<Button on:click={removePost}>Delete</Button>
	</Modal>