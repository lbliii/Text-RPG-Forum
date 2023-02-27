<script>
	import { userStore } from '../stores/userStore.js';
	import { Badge, Card, Heading, P } from 'flowbite-svelte';
	import CharacterList from './CharacterList.svelte';

	export let user = $userStore;

</script>

<div class="my-6">
	<Heading tag="h1" class="text-center text-white my-6">@{user.alias}</Heading>

	<Card size="lg" padding="sm" class="my-6">
		<div class="flex flex-row">
			<Heading tag="h4" class="mb-2">Stats</Heading>
			{#if user.age}
				<Badge color="pink" class="mr-2">{user.age}</Badge>
			{/if}
			{#if user.time_zone}
				<Badge color="dark">{user.time_zone}</Badge>
			{/if}
		</div>
	</Card>

	<div class="flex flex-row justify-between my-6">
		<Card size="lg" padding="sm" class="grow mr-2">
			{#if user.likes}
				<Heading tag="h4" class="mb-2">Likes</Heading>
				<P class="my-2">{@html user.likes}</P>
			{/if}
		</Card>
		<Card size="lg" padding="sm" class="grow ml-2">
			{#if user.dislikes}
				<Heading tag="h4" class="mb-2">Dislikes</Heading>
				<P class="my-2">{@html user.dislikes}</P>
			{/if}
		</Card>
	</div>

	<Heading tag="h2" class="my-6 text-center text-white">Characters</Heading>
	<CharacterList user={user}/>

</div>