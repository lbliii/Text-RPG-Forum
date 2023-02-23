<script>
    import {  Heading } from 'flowbite-svelte';
    import Threads from '../../../components/Threads.svelte';
    import Forum from '../../../components/Forum.svelte';

    export let data;
    let forum = data;
 
</script>


<main>

    <Heading tag="h1" class="my-3 text-center text-white">{#if forum && forum.title !== undefined}{forum.title} Threads {:else} Loading... {/if}</Heading>
    <Heading tag="h2" class="my-3 text-center text-white">{#if forum && forum.description !== undefined}{forum.description} {:else} Loading... {/if}</Heading>

    <Forum forum={forum} />

    <Threads  forum={forum} />

</main>
