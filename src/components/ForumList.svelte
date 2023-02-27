<script>
	import { forumsStore } from '../stores/forumsStore.js';
	import { forumStore } from '../stores/forumStore.js';
	import { Button, ButtonGroup, Card, Heading, P, Modal, Input, Textarea } from 'flowbite-svelte';

	export let user;

	let openCreateModal = false;
	let searchTerm = '';
	let newForum =  $forumStore
	let filteredForums = $forumsStore
	

	forumsStore.fetchForums()

	$: {
		$forumsStore
		
		if (searchTerm) {
			filteredForums = $forumsStore.filter((forum) => {
				return forum.title.toLowerCase().includes(searchTerm.toLowerCase());
			});
		} else {
			filteredForums = $forumsStore;
		}
	}

	function createForum() {
		forumStore.addForum({
			user_id: user.user_id,
			...newForum
		});
		newForum = {
			title: '',
			description: '',
			image: ''
		};
		openCreateModal = false;
	}
</script>


{#if user && user.admin && user.admin !== undefined}
	<div class="flex flex-row justify-end my-2">
		<ButtonGroup class="space-x-px">
			<Button size="xs" color="green" on:click={() => (openCreateModal = true)}>Create Forum</Button>
		</ButtonGroup>
	</div>
{/if}

<div class="flex justify-end items-center my-2">
	<input
		type="text"
		placeholder="Search forums"
		bind:value={searchTerm}
		class="border border-gray-400 rounded-md p-2 w-full md:w-1/3"
	/>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 grid-flow-row-dense">
	{#if filteredForums.length > 0}
		{#each filteredForums as forum}
			{#if forum.id !== undefined}
				<Card size="lg" padding="sm" img={forum.image} href={`/forum/${forum.id}`} class="my-4" >
					<Heading tag="h2" class="text-center">{forum.title}</Heading>
					{#if forum.description}
						<P class="text-center">{forum.description}</P>
					{/if}
				</Card>
			{/if}
		{/each}
	{/if}
</div>

<Modal bind:open={openCreateModal} title="Create Topic">
	<Input bind:value={newForum.title} placeholder="Enter a new topic." class="my-2" />
	<Textarea
		bind:value={newForum.description}
		id="description"
		name="description"
		placeholder="Enter a description here."
		class="my-2"
	/>
	<Input bind:value={newForum.image} placeholder="Enter an image url." class="my-2" />
	<Button color="green" on:click={createForum}>Create</Button>
</Modal>
