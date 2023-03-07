<script>
  import { Badge,  Card, P } from 'flowbite-svelte';
  import { playerStore } from '../../stores/playerStore.js';
  import { fade } from 'svelte/transition';

 export let user = {}
 let threadCount = 0

 $: {
		if (user.user_id) {
			playerStore.fetchPlayerThreadParticipationCount(user.user_id).then((data) => {
				threadCount = data
			})
		}
	}

</script>
 
{#if user.user_id !== undefined}
    <div class="my-2" in:fade="{{ duration: 1100 }}">
        <Card size="lg" padding="sm" href="/user/{user.user_id}">
            <div class="flex flex-row justify-between">
                <P size="xl" weight="bold" >{user.alias}</P>
            <div class="flex flex-row justify-end my-2">
                <Badge color="green" class="mr-2">{threadCount} Threads</Badge>
                {#if user.age}
                <Badge color="pink" class="mx-1"> LVL. {user.age}</Badge>
                {/if}
                {#if user.time_zone}
                <Badge color="dark">{user.time_zone}</Badge>
                {/if}
            </div>
            </div>
        </Card>
    </div>
{/if}
