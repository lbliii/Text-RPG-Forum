<script>
	import { charactersStore } from '../../stores/charactersStore.js';
	import { Card, Heading, P } from 'flowbite-svelte';
	import CharacterCRUD from './CharacterCRUD.svelte';
	import Character from './Character.svelte';

	export let user 
	
	$: $charactersStore

	$: {
    if (user.user_id) {
      charactersStore.fetchCharacters(user.user_id);
    }
  }
</script>

<Heading tag="h2" class="text-center text-white my-6">{user.alias}'s Characters</Heading>

{#if $charactersStore && $charactersStore.length === 0}
	<Card size="lg" padding="sm" class="my-2" color="green">
		<div class="flex flex-col text-center"> 
			<P size="xl" class="mb-3 font-semibold"> Let's create your first character 🎮 </P>
			<P class="mb-3">
				Here's the deal: You can't play Emdash without a character. So why not create one that's as epic as you are? Your character is your writing persona, your alter ego, your imaginary friend -- the one who will bring your threads and posts to life. <br><br>

				(And don't worry, you can always create more characters later from your profile page.)
			</P>
			<CharacterCRUD create={true} player={user.user_id}/>
		</div>
	</Card>
{:else }
	{#each $charactersStore as character}
		<Character character={character} user={user.user_id}/>
	{/each}
{/if}
