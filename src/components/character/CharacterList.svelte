<script>
	import { charactersStore } from '../../stores/charactersStore.js';
	import { Card, Heading, P } from 'flowbite-svelte';
	import CharacterCRUD from './CharacterCRUD.svelte';
	import Character from './Character.svelte';
	import { userStore } from '../../stores/userStore.js';

	export let player 


	$: if (player.user_id) {
      charactersStore.fetchCharacters(player.user_id);
    }
  
</script>

<Heading tag="h2" class="text-center text-white my-6">{player.alias}'s Characters</Heading>

{#if $charactersStore && $charactersStore.length === 0}

	<Card size="lg" padding="sm" class="my-2" color="green">
		{#if player.user_id === $userStore.user_id}
		<div class="flex flex-col text-center"> 
			<P size="xl" class="mb-3 font-semibold"> Let's create your first character 🎮 </P>
			<P class="mb-3">
				Here's the deal: You can't play Emdash without a character. So why not create one that's as epic as you are? Your character is your writing persona, your alter ego, your imaginary friend -- the one who will bring your threads and posts to life. <br><br>

				(And don't worry, you can always create more characters later from your profile page.)
			</P>
			<CharacterCRUD create={true} player={player.user_id}/>
		</div>
		{:else}
		<P size="xl" class="mb-3 font-semibold"> @{player.alias} has no characters yet. </P>
		{/if}

	</Card>
{:else }
	{#each $charactersStore as character}
		<Character character={character} user={player.user_id}/>
	{/each}
{/if}
