<script>
	import { characterStore } from '../stores/characterStore.js';
	import { Avatar, Badge } from 'flowbite-svelte';

	export let characterId 
	export let post;

	let character = {}

	

	if (characterId) {

		characterStore.fetchCharacter(characterId).then((data) => {
		character = data;
		});

	}

</script>

{#if character }
	<a href="/user/{character.user_id}">
			<div class="flex flex-row {post.id % 2 === 0 ? 'justify-start' : 'justify-end'} space-x-4">
				<div class="text-center">
					<Avatar size="xl" src="{character.avatar}"/>
					<Badge>{character.first_name} {character.last_name}</Badge>
				</div>
			</div>
	</a>
{/if }



<!-- Todo: swap the user path for the character's plotter page once created. -->
<!-- Todo: fix a href to not take up the whole row -->