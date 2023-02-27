<script>
	import { Badge} from 'flowbite-svelte';
	import { threadCharacterStore } from '../stores/threadCharacterStore.js';

	export let character
	let thread_count = []

	async function countThreads(character_id) {
		let count = await threadCharacterStore.fetchCharacterThreads(character_id)
		thread_count = count.length
	}

    countThreads(character.id)
</script>

<Badge color="gray">{thread_count} Threads</Badge>