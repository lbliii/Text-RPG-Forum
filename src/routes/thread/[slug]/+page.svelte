<script>
  import {Avatar, Card, Heading, Hr, Modal, P} from 'flowbite-svelte'
  import {posts, loadPosts} from '../../../stores/postStore.js';
  import PostMenu from '../../../components/PostMenu.svelte';
  import Post from '../../../components/Post.svelte';

  export let data;
  let thread = data;

  loadPosts(thread.id);
</script>

<PostMenu thread={thread} />

<Heading tag="h2" class="my-2">{thread.title} </Heading>

<P class="my-2">{thread.description}</P>

{#each $posts as post}
  <Post post={post} />
{/each}

