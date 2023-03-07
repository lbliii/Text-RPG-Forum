<script>
	import { playerStore } from '../../stores/playerStore.js';
	import { Badge, Card, Heading, P } from 'flowbite-svelte';

	export let user = $playerStore
	let threadCount = 0

	$: {
		if (user.user_id) {
			playerStore.fetchPlayerThreadParticipationCount(user.user_id).then((data) => {
				threadCount = data
			})
		}
	}

</script>

<div class="my-6">
	<Heading tag="h1" class="text-center text-white my-6">@{#if user.alias}{user.alias}{:else} No Alias Yet{/if}</Heading>

	<Card size="lg" padding="sm" class="my-6">
		<div class="flex flex-row justify-between items-center">
			<div>
				<Heading tag="h4">Stats</Heading>
			</div>
			<div>
				<Badge color="green" class="mr-2">{threadCount} Threads</Badge>
				{#if user.age}
				<Badge color="pink" class="mr-2 ">LVL. {user.age}</Badge>
			{:else}
				<Badge color="pink" class="mr-2 ">LVL. 0 </Badge>
			{/if}
			{#if user.time_zone}
				<Badge color="indigo">{user.time_zone}</Badge>
			{:else}
				<Badge color="indigo">No Time Zone</Badge>
			{/if}
			</div>
		</div>
	</Card>

	<div class="flex flex-row justify-between my-6">
		<Card size="lg" padding="sm" class="grow mr-2">
			<Heading tag="h4" class="mb-2">Likes</Heading>
			{#if user.likes}
				<P class="my-2">{@html user.likes}</P>
				{:else}
				<P class="my-2">List some genres or plots that you like so other writers can send you relevant ideas.</P>
			{/if}
		</Card>
		<Card size="lg" padding="sm" class="grow ml-2">
			<Heading tag="h4" class="mb-2">Dislikes</Heading>
			{#if user.dislikes}
				<P class="my-2">{@html user.dislikes}</P>
			{:else}
				<P class="my-2">List some genre or plot dislikes so other writers can send you relevant ideas.</P>
			{/if}
		</Card>
	</div>

</div>