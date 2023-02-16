<script>
  import {Avatar, Card, Heading, Hr, Modal, P, Badge} from 'flowbite-svelte'
  import { forumStore } from '../../../stores/forumStore.js';
  import Posts from '../../../components/Posts.svelte';

  export let data;
  let thread = data;
  let forum = {};

  $: forum = $forumStore.find(forum => forum.id === thread.topic_id);


</script>

<section>
  
  <div class="text-center">
    <Heading tag="h1" class="my-3">{thread.title}</Heading>
    <Badge href="/forum/{forum.id}">{forum.title}</Badge>
  </div>
  

  <Posts thread={thread}></Posts>
  
    
</section>
