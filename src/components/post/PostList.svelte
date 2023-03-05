<script>
import { Button, ButtonGroup} from 'flowbite-svelte';
import { postsStore } from '../../stores/postsStore.js';
import Post from './Post.svelte';

export let thread;
export let user;

let sortAscending = true;

postsStore.fetchPosts(thread.id);

$: {
	$postsStore 
}

function toggleSort() {
		sortAscending = !sortAscending;
	}

</script>


<div class="flex flex-row justify-end my-6">
	<ButtonGroup class="space-x-px">
		<Button size="xs" color="light" on:click={toggleSort}>
			{sortAscending ? 'Newest' : 'Oldest'}
		</Button>
		<slot> </slot>
	</ButtonGroup>
</div>

<div class="flex {sortAscending ? 'flex-col-reverse' : 'flex-col'}">

	{#each $postsStore as post }
		<Post thread={thread} post={post} user={user} sort={sortAscending} margin="mb-9"/>
	{/each}

</div>
	
