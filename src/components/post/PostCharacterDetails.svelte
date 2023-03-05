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

{#if characterId && character }
	<div class="flex flex-col text-center w-fit space-y-3">
		<a href="/user/{character.user_id}">
			{#if character.avatar}
				<Avatar size="xl" src="{character.avatar}" class="-mb-5"/>
			{/if}
			{#if character.first_name}
				<Badge>{character.first_name} {character.last_name}</Badge>
			{/if}
		</a>
	</div>
{/if }


