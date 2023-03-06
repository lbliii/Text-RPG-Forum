<script>
	import { Card, Heading, P} from 'flowbite-svelte';
	import { threadCharacterStore } from '../../stores/threadCharacterStore.js';
	import Thread from '../thread/Thread.svelte';

	export let character 

	threadCharacterStore.fetchCharacterThreads(character.id)

   $: threadCharacterStore

</script>


<Heading tag="h4" class="my-6 text-center text-white">Active Threads</Heading>
{#if $threadCharacterStore.length > 0}
	{#each $threadCharacterStore as thread}
		<Thread thread={thread} displayForumTitle={true} />
	{/each}
{:else}
	<Card size="lg" padding="sm" class="my-6" >
		<Heading tag="h4" class="mb-2">No Active Threads</Heading>
		<P class="my-2">This character is not currently in any active threads.</P>
	</Card>
{/if}