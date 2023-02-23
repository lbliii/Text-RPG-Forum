<script>
	import { characterStore } from '../stores/characterStore.js';
	import { Avatar, Badge } from 'flowbite-svelte';

	export let character = $characterStore
	export let post;

	$: characterStore.fetchCharacter(character);

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
