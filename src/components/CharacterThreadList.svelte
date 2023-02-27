<script>
	import { Badge, Card, Heading, P} from 'flowbite-svelte';
	import { forumStore } from '../stores/forumStore.js';
	import { threadCharacterStore } from '../stores/threadCharacterStore.js';

	export let character 

	threadCharacterStore.fetchCharacterThreads(character.id)

   $: threadCharacterStore

	async function fetchForumTitle (id) {
        return forumStore.fetchForum(id)
   }

</script>


<Heading tag="h4" class="my-6 text-center text-white">Active Threads</Heading>
{#if $threadCharacterStore.length > 0}
	{#each $threadCharacterStore as thread}
		<Card size="lg" padding="sm" class="my-6" href="/thread/{thread.id}" >
		<Badge color="purple" class="mb-2 w-fit">
			{#await fetchForumTitle(thread.forum_id)}
				<span>Loading...</span>
			{:then forum}
				<span>{forum.title}</span>
			{/await}
		</Badge>
		<Heading tag="h4" class="mb-2">{thread.title}</Heading>
		<P class="my-2">{@html thread.description}</P>
		</Card>
	{/each}
{:else}
	<P class="my-2">No active threads</P>
{/if}