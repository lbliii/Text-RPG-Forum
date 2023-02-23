<script>
	import { postStore } from '../stores/postStore.js';
	import { authStore } from '../stores/authStore.js';
	import { threadStore } from '../stores/threadStore.js';
	import { charactersStore } from '../stores/charactersStore.js';
	import { threadCharactersStore } from '../stores/threadCharactersStore.js';
	import { Button, ButtonGroup, Modal, Card, P, Textarea } from 'flowbite-svelte';
	import { onMount, onDestroy } from 'svelte';
	import PostCharacterDetails from './PostCharacterDetails.svelte';

	export let thread;

	let auth = {};
	let newPost = $postStore;
	let creatingPost = false;
	let characters = $charactersStore;
	let editingPost = false;
	let deletingPost = false;
	let activePost = {};
	let sortAscending = true;
	let playingCharacters = $charactersStore;
	let playingCharacterId;

	onMount(async () => {
		auth = await authStore.get();
		characters = await charactersStore.fetchCharacters(auth.id);
		playingCharacters = await threadCharactersStore.loadCharacters(thread.id);
	});

	onDestroy(() => {
		unsubscribe();
	});

	const unsubscribe = threadCharactersStore.subscribe((characters) => {
		playingCharacters = characters;
	});

	$: postStore.fetchPosts(thread.id);

	$: sortedPosts = $postStore.sort((a, b) => {
		const sortFactor = sortAscending ? -1 : 1;
		return sortFactor * (new Date(a.created_at) - new Date(b.created_at));
	});

	function addPost() {
		postStore.addPost({
			user_id: auth.id,
			thread_id: thread.id,
			...newPost
		});
		newPost = { body: '' };
		threadStore.editThread({
			...thread,
			last_updated: new Date()
		});
		creatingPost = false;
	}

	function updatePost() {
		postStore.updatePost(activePost);
		editingPost = false;
		activePost = {};
	}

	function removePost() {
		postStore.deletePost(activePost);
		deletingPost = false;
		activePost = {};
	}

	function toggleSort() {
		sortAscending = !sortAscending;
	}

	function isOwner(post) {
		if (auth) {
			return auth.id === post.user_id;
		}
	}

	function activeCharacterCheck() {
		if (playingCharacters.length === 0) {
			threadCharactersStore.addCharacter({
				user_id: auth.id,
				thread_id: thread.id,
				character_id: newPost.character_id
			});
			console.log('false');
			return false;
		} else if (playingCharacters.length > 0) {
			for (let i = 0; i < playingCharacters.length; i++) {
				if (playingCharacters[i].user_id === auth.id) {
					console.log('true');
					playingCharacterId = playingCharacters[i].character_id;
					newPost.character_id = playingCharacterId;
					return true;
				}
			}
		}
	}

	activeCharacterCheck();
</script>

<section>
	<div class="flex flex-row justify-end my-2">
		<ButtonGroup class="space-x-px">
			<Button size="xs" color="light" on:click={toggleSort}>
				{sortAscending ? 'Newest' : 'Oldest'}
			</Button>
			<Button size="xs" color="green" on:click={() => (creatingPost = true)}>Create Post</Button>
		</ButtonGroup>
	</div>

	{#each sortedPosts as post}
		<section class="my-5">
			<Card size="lg" padding="sm" class="my-2 " href={`/thread/${thread.id}/post/${post.id}`}>
				{#key post.id}
					<PostCharacterDetails character={post.character_id} {post} />
				{/key}
				<P class="text-2xl font-bold dark:text-white text-justified my-6">{post.body}</P>
			</Card>
			<div class="text-right">
				{#if isOwner(post)}
					<ButtonGroup class="space-x-px">
						<Button
							size="xs"
							color="light"
							on:click={() => {
								activePost = post;
								editingPost = true;
							}}>Edit</Button
						>
						<Button
							size="xs"
							color="red"
							on:click={() => {
								activePost = post;
								deletingPost = true;
							}}>Delete</Button
						>
					</ButtonGroup>
				{/if}
			</div>
		</section>
	{/each}

	<Modal bind:open={creatingPost} title="Create Post">
		{#if activeCharacterCheck() === false}
			{#if characters.length === 0}
				<P>You must create a character before you can create a thread.</P>
			{/if}
			{#if characters.length > 0}
				<div>
					<P>Choose a character to associate with this thread.</P>
					<select bind:value={newPost.character_id} required>
						{#each characters as character}
							<option value={character.id}>{character.first_name} {character.last_name}</option>
						{/each}
					</select>
				</div>
			{/if}
		{/if}
		<Textarea bind:value={newPost.body} />
		<Button on:click={addPost}>Create</Button>
	</Modal>

	<Modal bind:open={editingPost} title="Edit Post">
		<Textarea bind:value={activePost.body} />
		<Button on:click={updatePost}>Update</Button>
	</Modal>

	<Modal bind:open={deletingPost} title="Delete Post">
		<P>Are you sure you want to delete this post?</P>
		<Button on:click={removePost}>Delete</Button>
	</Modal>
</section>
