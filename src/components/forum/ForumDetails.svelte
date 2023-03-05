<script>
    import { Heading} from 'flowbite-svelte';

    export let forum

</script>

{#if forum}
    <a href="/forums">
        <div class="my-6 py-20 rounded-xl" style="background:url({forum.image}); background-size: cover;" >
            <Heading tag="h1" class="text-center text-white ">{forum.title} Threads</Heading>
            <Heading tag="h2" class="text-center text-white ">{forum.description}</Heading>
        </div>
    </a>
    <div class="-mt-20 mx-3">
        <slot> </slot>
    </div>
{/if}