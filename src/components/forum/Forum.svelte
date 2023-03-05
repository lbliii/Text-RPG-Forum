<script>
	import { Card, Heading, P } from 'flowbite-svelte';
    export let forum = {};

</script>


{#if forum.id !== undefined}

    <Card size="lg" padding="sm" img={forum.image} href={`/forum/${forum.id}`} class="my-4" >
        <Heading tag="h2" class="text-center">{forum.title}</Heading>
        {#if forum.description}
            <P class="text-center">{forum.description}</P>
        {/if}
        <slot> </slot>
    </Card>

{/if}

