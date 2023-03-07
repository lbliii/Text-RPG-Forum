<script>
  import { Button, Badge,  Card, } from 'flowbite-svelte';
  import { fade } from 'svelte/transition';

 export let user = {}
</script>
 
{#if user.user_id !== undefined}
    <div class="my-2" in:fade="{{ duration: 1100 }}">
        <Card size="lg" padding="sm">
            <div class="flex flex-row justify-between">
            <Button pill={true} size="md" outline={true} class="w-fit" href="/user/{user.user_id}">@{user.alias}</Button>
            <div class="flex flex-row justify-end my-2">
                {#if user.age}
                <Badge color="pink" class="mx-1">{user.age} </Badge>
                {/if}
                {#if user.time_zone}
                <Badge color="dark">{user.time_zone} </Badge>
                {/if}
            </div>
            </div>
        </Card>
    </div>
{/if}
