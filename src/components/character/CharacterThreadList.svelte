<script>
	import { Card, Heading, P, A} from 'flowbite-svelte';
	import { threadCharacterStore } from '../../stores/threadCharacterStore.js';
	import Thread from '../thread/Thread.svelte';

	export let character 
	export let compact = false;
	let threads = []

	$:if (character.id) {
		threadCharacterStore.fetchCharacterThreads(character.id).then((data) => {
			threads = data;
		});
	}

</script>

{#if !compact}
<Heading tag="h4" class="my-6 text-center text-white">Active Threads</Heading>
{/if}
{#if threads.length > 0}
	{#each threads as thread}
		<Thread thread={thread} displayForumTitle={true} compact={compact} />
	{/each}
{:else}
	<Card size="lg" padding="sm" class="my-6" >
		<Heading tag="h4" class="mb-2">No Active Threads</Heading>
		<P class="my-2">This character has no active threads. Explore the <A  href="/forums" class="text-green-500 font-semibold">forums</A> to join a thread or start your own! </P>
	</Card>
{/if}