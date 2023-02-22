<script>
	import { characterStore } from '../stores/characterStore.js';
	import { Avatar, Badge } from 'flowbite-svelte';
	import { onMount, onDestroy } from 'svelte';

	export let character;
	export let post;

	onMount(async () => {
		character = await characterStore.loadCharacter(character);
	});
</script>

{#if character}
	<div class="flex flex-row my-2 {post.id % 2 === 0 ? 'justify-start' : 'justify-end'}">
		<Avatar size="lg" border="true" />
	</div>
	<div class="flex flex-row my-2 {post.id % 2 === 0 ? 'justify-start' : 'justify-end'}">
		{#if character.first_name && character.last_name !== null}
			<Badge color={post.id % 2 === 0 ? 'green' : 'blue'}>
				{character.first_name} {character.last_name}</Badge
			>
		{/if}
	</div>
{/if}
