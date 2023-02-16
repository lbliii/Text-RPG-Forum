<script>
  import {Avatar, Card, Heading, Hr, Modal, P} from 'flowbite-svelte'
  import Posts from '../../../components/Posts.svelte';

  export let data;
  let thread = data;


</script>

<section>
  
  <Heading tag="h1" class="mb-2">{thread.title}</Heading>

  <Posts thread={thread}></Posts>
  
    
</section>
