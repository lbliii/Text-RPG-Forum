<script>
  import {Avatar, Card, Heading, Hr, Modal, P} from 'flowbite-svelte'
  import {posts, loadPosts} from '../../../stores/postStore.js';
  import PostMenu from '../../../components/PostMenu.svelte';

  export let data;
  let thread = data;

  loadPosts(thread.id);
</script>

<PostMenu  />

<Heading tag="h2" class="my-2">{thread.title} </Heading>

<P class="my-2">{thread.description}</P>

{#each $posts as post}
  <Card size="lg" padding="sm" class="my-2">
    <Avatar />
    <P class="my-2">{post.body}</P>
  </Card>
{/each}

