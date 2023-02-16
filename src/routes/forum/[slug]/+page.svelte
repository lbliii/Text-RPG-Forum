<script>
    import { Avatar, Badge, Button, Card, Heading, Hr, Modal, P } from 'flowbite-svelte';
    import Threads from '../../../components/Threads.svelte';

    export let data;

    let topic = data;
 
</script>


<main>

    <Heading tag="h1" class="my-3 text-center text-white">{topic.title} Threads</Heading>

    <Threads  topic={topic}/>

</main>
