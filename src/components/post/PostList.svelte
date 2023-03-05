<script>
import { Button, ButtonGroup} from 'flowbite-svelte';
import { postsStore } from '../../stores/postsStore.js';
import Post from './Post.svelte';
import { BarsArrowDown, BarsArrowUp } from 'svelte-heros-v2';

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
			{#if sortAscending}
				<BarsArrowUp size="15" />
			{:else}
				<BarsArrowDown size="15" />
			{/if}
		</Button>
		<slot> </slot>
	</ButtonGroup>
</div>

<div class="flex {sortAscending ? 'flex-col-reverse' : 'flex-col'} space-y-10">

	{#each $postsStore as post }
		<Post thread={thread} post={post} user={user} sort={sortAscending}/>
	{/each}

</div>
	
