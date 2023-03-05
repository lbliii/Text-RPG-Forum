<script>
	import { characterStore } from '../../stores/characterStore.js';
	import { Avatar, Badge } from 'flowbite-svelte';

	export let characterId 
	export let post = {}

	let character = {}

	if (characterId) {
		characterStore.fetchCharacter(characterId).then((data) => {
		character = data;
		});
	}

</script>

{#if character }
	<a href="/user/{character.user_id}">
			<div class="flex flex-row {post.id % 2 === 0 ? 'justify-start' : 'justify-end'}">
				<div class="text-center">
					{#if character.avatar}
					<Avatar size="xl" src="{character.avatar}"/>
					{/if}
					{#if character.first_name}
					<Badge>{character.first_name} {character.last_name}</Badge>
					{/if}
				</div>
			</div>
	</a>
{/if }


