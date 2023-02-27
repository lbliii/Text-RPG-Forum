<script>
    import { Heading} from 'flowbite-svelte';

    export let forum

</script>


{#if forum}
    <div class="my-6">
        <Heading tag="h1" class="my-3 text-center text-white">{forum.title} Threads</Heading>
        <Heading tag="h2" class="my-3 text-center text-white">{forum.description}</Heading>
    </div>
{/if}