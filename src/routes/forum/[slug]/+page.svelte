<script>
    import { Avatar, Badge, Button, Card, Heading, Hr, Modal, P } from 'flowbite-svelte';
    import Threads from '../../../components/Threads.svelte';

    export let data;

    let topic = data;
 
</script>


<main>

    <Heading tag="h1" class="mb-2">{topic.title}</Heading>


    <Threads  topic={topic}/>

</main>
