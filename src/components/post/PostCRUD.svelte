<script>
import { Button, Modal, P, Textarea,  Dropdown, DropdownItem, Label } from 'flowbite-svelte';
import { EllipsisHorizontalCircle  } from 'svelte-heros-v2'
import { charactersStore } from '../../stores/charactersStore.js';
import { postStore } from '../../stores/postStore.js';

export let thread;
export let user;
export let action;
export let post = {};

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
 

function handlePostCreate() {
		
		postStore.addPost({
			user_id: user.user_id,
			thread_id: thread.id,
			...newPost
		})

		// reset newPost object
		newPost = {};

		createModal = false;
	}
function handlePostUpdate() {
		
		postStore.editPost(activePost);
		editModal = false;
	}

function handlePostDelete() {
		
		postStore.removePost(activePost);
		deleteModal = false;
	}

</script>

{#if action === 'create'}
    <Button size="xs" color="green" on:click={() => (createModal = true)}>Add a Post</Button>
{:else if post.user_id === user.user_id }
    <div class="flex  justify-end">
        <EllipsisHorizontalCircle size="30" class="cursor-pointer"  />
        <Dropdown >
            <DropdownItem on:click={() => (editModal = true, activePost = post)}>Edit</DropdownItem>
            <DropdownItem on:click={() => (deleteModal = true, activePost = post)} >Delete</DropdownItem>
        </Dropdown>
    </div>

{/if}




<Modal bind:open={createModal} title="Add a Post to: {thread.title}.">
	{#if $charactersStore }
		<select bind:value={newPost.character_id} required>
			{#each $charactersStore as character}
				<option value={character.id}>{character.first_name} {character.last_name}</option>
			{/each}
		</select>
	{/if}
	<Label for="body" class="mb-2">Write a Post Body</Label>
	<Textarea id="body" rows="10" bind:value={newPost.body} />
	<Button color="green" on:click={handlePostCreate}>Create</Button>
</Modal>

<Modal bind:open={editModal} title="Edit Post">
	{#if $charactersStore }
		<select bind:value={activePost.character_id} required>
			{#each $charactersStore as character}
				<option value={character.id}>{character.first_name} {character.last_name}</option>
			{/each}
		</select>
	{/if}
	<Textarea bind:value={activePost.body} />
	<Button on:click={handlePostUpdate}>Update</Button>
</Modal>

<Modal bind:open={deleteModal} title="Delete Post">
	<P>Are you sure you want to delete this post?</P>
	<Button color="red" on:click={handlePostDelete}>Delete</Button>
</Modal>
