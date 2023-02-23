<script>
	import { characterStore } from '../stores/characterStore.js';
	import { forumStore } from '../stores/forumStore.js';
	import { postStore } from '../stores/postStore.js';
	import { threadStore } from '../stores/threadStore.js';
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
	let user = $userStore;
	const newPost = $postStore;
	let filteredThreads = $threadStore;
	let searchTerm = '';
	let openCreateModal = false;


	$: {
		threadStore.fetchThreads(forum.id);
		if (user) {
			characterStore.fetchCharacters(user.user_id);
		}
	}

	$: {
		if (searchTerm) {
			filteredThreads = $threadStore.filter((forum) => {
				return forum.title.toLowerCase().includes(searchTerm.toLowerCase());
			});
		} else {
			filteredThreads = $threadStore;
		}
	}

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
</script>

<section>
	<div class="flex flex-row justify-end my-2">
		<ButtonGroup class="space-x-px">
			<Button size="xs" color="green" on:click={() => (openCreateModal = true)}>
				Create Thread</Button
			>
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

	{#if $threadStore && $threadStore.length > 0}
		{#each filteredThreads as thread}
			<div class="my-2">
				<Card size="lg" padding="sm" img={thread.image} href={`/thread/${thread.id}`}>
					<Heading size="md" class="text-center">{thread.title}</Heading>
					{#if thread.description}
						<P class="text-center">{thread.description}</P>
					{/if}
					<div class="flex flex-row justify-end my-2">
						<Badge class="mx-1">characters: todo</Badge>
						<Badge>posts: todo</Badge>
					</div>
				</Card>
			</div>
		{/each}
	{:else if $threadStore && $threadStore.length === 0}
		<div class="my-2">
			<Card size="lg" padding="sm">
				<Heading size="md" class="text-center">No threads in this forum yet!</Heading>
			</Card>
		</div>
	{:else if !$threadStore}
		<div class="my-2">
			<Card size="lg" padding="sm">
				<Heading size="md" class="text-center">loading...</Heading>
			</Card>
		</div>
	{/if}
</section>

<Modal bind:open={openCreateModal} title="Create Thread">
	{#if $characterStore.length === 0}
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
	{#if $characterStore.length > 0}
		<div>
			<P>Choose a character to associate with this thread.</P>
			<select bind:value={newThread.character_id} required>
				{#each $characterStore as character}
					<option value={character.id}>{character.first_name} {character.last_name}</option>
				{/each}
			</select>
		</div>
	{/if}
	<Button color="green" on:click={createThread}>Create</Button>
</Modal>

<!-- #todo: split thread and threads as stores so it's cleaner -->
