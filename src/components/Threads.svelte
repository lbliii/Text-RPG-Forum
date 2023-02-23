<script>
	import { charactersStore } from '../stores/charactersStore.js';
	import { forumStore } from '../stores/forumStore.js';
	import { postStore } from '../stores/postStore.js';
	import { threadStore } from '../stores/threadStore.js';
	import { threadsStore } from '../stores/threadsStore.js';
	import { userStore } from '../stores/userStore.js';
	import {
		Button,
		ButtonGroup,
		Card,
		Heading,
		P,
		Modal,
		Input,
		Textarea,
		Badge
	} from 'flowbite-svelte';

	export let forum = $forumStore;
	const newThread = $threadStore;
	const newPost = $postStore;

	let user = $userStore;
	let sortAscending = true;
	let sortedThreads = $threadsStore;
	let filteredThreads = $threadsStore;
	let searchTerm = '';
	let openCreateModal = false;

	$: threadsStore.fetchThreads(forum.id)

	$: {
		if (user.user_id){
		charactersStore.fetchCharacters(user.user_id);

		}
		
		if (searchTerm) {
			filteredThreads = $threadsStore.filter((forum) => {
				return forum.title.toLowerCase().includes(searchTerm.toLowerCase());
			});
		} else {
			filteredThreads = $threadsStore;
		}
	}


	$: sortedThreads = filteredThreads.sort((a, b) => {
		const sortFactor = sortAscending ? -1 : 1;
		return sortFactor * (new Date(a.created_at) - new Date(b.created_at));
	});

	function createThread() {
		newPost.set({
			user_id: user.user_id,
			...newPost
		});

		threadStore.addThread({
			user_id: user.user_id,
			forum_id: forum.id,
			...newThread
		});
		newThread.set({ title: '', description: '', character_id: '' });
		newPost.set({ body: '' });
		openCreateModal = false;
	}

	function toggleSort() {
		sortAscending = !sortAscending;
	}
</script>

<section>
	<div class="flex flex-row justify-end my-2">
		<ButtonGroup class="space-x-px">
			<Button size="xs" color="light" on:click={toggleSort}>
				{sortAscending ? 'Newest' : 'Oldest'}
			</Button>
			<Button size="xs" color="green" on:click={() => (openCreateModal = true)}>
				Create Thread
			</Button>
		</ButtonGroup>
	</div>
	<div class="flex justify-end items-center my-2">
		<input
			type="text"
			placeholder="Search threads"
			bind:value={searchTerm}
			class="border border-gray-400 rounded-md p-2 w-1/3"
		/>
	</div>

	{#if sortedThreads  }
		{#each sortedThreads as thread}
			<div class="my-2">
				<Card size="lg" padding="sm" img={thread.image} href={`/thread/${thread.id}`}>
					<Heading size="md" class="text-center">{thread.title}</Heading>
					{#if thread.description}
						<P class="text-center">{thread.description}</P>
					{/if}
					<div class="flex flex-row justify-end my-2">
						<Badge class="mx-1">characters: todo</Badge>
						<Badge>posts: todo</Badge>
						<Badge> {new Date(thread.last_updated).toLocaleString('en-US', { month: 'short', day: 'numeric', hour:'numeric'  })}</Badge>
					</div>
				</Card>
			</div>
		{/each}
	{:else if $threadsStore && $threadStore.length === 0}
		<div class="my-2">
			<Card size="lg" padding="sm">
				<Heading size="md" class="text-center">No threads in this forum yet!</Heading>
			</Card>
		</div>
	{:else if !$threadsStore}
		<div class="my-2">
			<Card size="lg" padding="sm">
				<Heading size="md" class="text-center">loading...</Heading>
			</Card>
		</div>
	{/if}
</section>

<Modal bind:open={openCreateModal} title="Create Thread">
	{#if $charactersStore.length === 0}
		<P>You must create a character before you can create a thread.</P>
	{/if}
	<Input bind:value={newThread.title} placeholder="Enter a new thread title." class="my-2" />
	<Textarea
		bind:value={newThread.description}
		id="description"
		name="description"
		placeholder="Enter a description here."
		class="my-2"
	/>
	<Textarea
		bind:value={newPost.body}
		id="body"
		name="body"
		placeholder="Enter a post body here."
		class="my-2"
	/>
	{#if $charactersStore.length > 0}
		<div>
			<P>Choose a character to associate with this thread.</P>
			<select bind:value={newThread.character_id} required>
				{#each $charactersStore as character}
					<option value={character.id}>{character.first_name} {character.last_name}</option>
				{/each}
			</select>
		</div>
	{/if}
	<Button color="green" on:click={createThread}>Create</Button>
</Modal>

<!-- #todo: split thread and threads as stores so it's cleaner -->
