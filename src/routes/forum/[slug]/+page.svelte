<script>
    import {  Heading } from 'flowbite-svelte';
    import Threads from '../../../components/Threads.svelte';

    export let data;

    let forum = data;
 
</script>


<main>

    <Heading tag="h1" class="my-3 text-center text-white">{#if forum && forum.title !== undefined}{forum.title} Threads {:else} Loading... {/if}</Heading>

    <Threads  forum={forum} />

</main>
