<script>
    import {  Heading, Card } from 'flowbite-svelte';
    import { forumStore } from '../../../stores/forumStore.js';
    import Threads from '../../../components/Threads.svelte';
    import Forum from '../../../components/Forum.svelte';
    // import { onMount } from 'svelte';

    export let data;
    let forum = data;

    $: $forumStore

    // onMount(async () => {

    //     document.documentElement.style.backgroundImage = `url('${forum.image}')`;
    //         // scale image to fit the screen
    //         document.documentElement.style.backgroundSize = 'cover';
    //         // add the class bg-fixed to the html element to make the background image fixed
    //         document.documentElement.classList.add('bg-fixed');

    // } );
   
	
	
 
</script>


<main >
    
    {#if $forumStore}
    <div class="my-6">
        <Heading tag="h1" class="my-3 text-center text-white">{$forumStore.title} Threads</Heading>
        <Heading tag="h2" class="my-3 text-center text-white">{$forumStore.description}</Heading>
    </div>
    {/if}
    
    <Forum forum={forum} />

    <Threads  forum={forum} />

</main>
