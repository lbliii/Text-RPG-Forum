<script>
import { Button, ButtonGroup, Modal, Card, P, Textarea, Badge, Dropdown, DropdownItem, Label } from 'flowbite-svelte';
import { EllipsisHorizontalCircle, FingerPrint  } from 'svelte-heros-v2'
import { charactersStore } from '../stores/charactersStore.js';
import { postStore } from '../stores/postStore.js';
import { postsStore } from '../stores/postsStore.js';
import PostCharacterDetails from './PostCharacterDetails.svelte';

export let thread;
export let user;

let sortAscending = true;
let createModal = false;
let newPost = {};
let editModal = false;
let activePost = {};
let deleteModal = false;


postsStore.fetchPosts(thread.id);

$: {
	
	if (user.user_id) {
		charactersStore.fetchCharacters(user.user_id);
	} 

	$postsStore 
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
function handlePostUpdate() {
		
		postStore.editPost(activePost);
		editModal = false;
	}

function handlePostDelete() {
		
		postStore.removePost(activePost);
		deleteModal = false;
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

	<div class="flex {sortAscending ? 'flex-col-reverse' : 'flex-col'}">

		{#await $postsStore}
			<Card size="lg" padding="sm" class="my-4" >
				<P>Loading...</P>
			</Card>
		{:then $postsStore} 
		
			{#each $postsStore as post }
				{#if !sortAscending}
					{#key post.id}
						<PostCharacterDetails characterId={post.character_id} {post} />
						
					{/key}
				{/if}
			
				<Card size="lg" padding="md" class="mt-4 mb-7" >
					<div class="flex flex-row {post.id % 2 === 0 ? 'justify-end' : 'justify-start'}">
						<Badge color="green"> {new Date(post.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour:'numeric'  })}</Badge>
						
					</div>
					
					<P class="my-10">{post.body}</P>

					{#if post.user_id === user.user_id}
					<div class="flex  justify-end">
						<EllipsisHorizontalCircle size="30" class="cursor-pointer"  />
						<Dropdown >
							<DropdownItem on:click={() => (editModal = true, activePost = post)}>Edit</DropdownItem>
							<DropdownItem on:click={() => (deleteModal = true, activePost = post)} >Delete</DropdownItem>
						</Dropdown>
					</div>
					
					{/if}
	
				</Card>
				{#if sortAscending}
					{#key post.id}
						<PostCharacterDetails characterId={post.character_id} {post} />
					{/key}
				{/if}
			{/each}
		{/await}

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
