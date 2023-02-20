<script>
  import {Avatar, Card, Heading, Hr, Modal, P, Badge} from 'flowbite-svelte'
  import { forumStore } from '../../../stores/forumStore.js';
  import Posts from '../../../components/Posts.svelte';
  import { onMount, onDestroy } from 'svelte';

  export let data;
  let thread = data;
  let forum = {};


  const unsubscribe = forumStore.subscribe((forum) => {
    forum = forum;
  });

  onMount (async () => {
    forum = await forumStore.fetchTopic(thread.topic_id);
  });

  onDestroy(() => {
    unsubscribe();
  });


</script>



<section>
  
  <div class="text-center">
    <Heading tag="h1" class="my-3 text-white">{thread.title}</Heading>

    <Badge href="/forum/{forum.id}">{forum.title}</Badge>

  </div>
  

  <Posts thread={thread}></Posts>
  
    
</section>
