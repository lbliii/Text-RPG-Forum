<script>
    import {  Heading } from 'flowbite-svelte';
    import { forumStore } from '../../../stores/forumStore.js';
    import Threads from '../../../components/Threads.svelte';
    import Forum from '../../../components/Forum.svelte';

    export let data;
    let forum = data;

    $: $forumStore
 
</script>


<main>
    {#if $forumStore}
    <Heading tag="h1" class="my-3 text-center text-white">{$forumStore.title} Threads</Heading>
    <Heading tag="h2" class="my-3 text-center text-white">{$forumStore.description}</Heading>
    {/if}

    <Forum forum={forum} />

    <Threads  forum={forum} />

</main>
