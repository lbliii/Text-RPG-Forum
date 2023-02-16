<script>
  import { postStore } from '../stores/postStore.js';
  import { accountStore } from '../stores/accountStore.js';
  import { threadStore } from '../stores/threadStore.js';
  import { Button, ButtonGroup, CloseButton, Input, Modal, Card, P, Textarea } from 'flowbite-svelte';

  export let thread;

  let user = {};
  let newPost = { body: '' };
  let creatingPost = false;
  let editingPost = false;
  let deletingPost = false;
  let activePost = {};
  let sortAscending = true;

  $: user = $accountStore;

  $: postStore.fetchPosts(thread.id)

  $: sortedPosts = $postStore.sort((a, b) => {
    const sortFactor = sortAscending ? -1 : 1;
    return sortFactor * (new Date(a.created_at) - new Date(b.created_at));
  });

  function addPost() {
    postStore.addPost({
      user_id: user.id,
      thread_id: thread.id,
      ...newPost
    });
    newPost = { body: '' };
    threadStore.updateThread({
      ...thread,
      last_updated: new Date()
    });
    creatingPost = false;
  }

  function updatePost() {
    postStore.updatePost(activePost);
    editingPost = false;
    activePost = {};
  }

  function removePost() {
    postStore.deletePost(activePost);
    deletingPost = false;
    activePost = {};
  }

  function toggleSort() {
    sortAscending = !sortAscending;
  }

</script>

<section>

  <div class="flex flex-row justify-end my-2">
    <ButtonGroup class="space-x-px" >
      <Button size="xs" outline on:click={toggleSort}>
        {sortAscending ? 'Newest' : 'Oldest'}
      </Button>
      <Button size="xs" color="green" on:click={() => creatingPost = true}>Create Post</Button>
    </ButtonGroup>
  </div>

  {#each sortedPosts as post}
  
    <section class="my-5">
      <Card size="lg" padding="sm" class="my-2 " color="{post.id % 2 === 0 ? 'white' : 'gray'}"  href={`/thread/${thread.id}/post/${post.id}`}>
        <P class="text-2xl font-bold dark:text-white text-center my-6">{post.body}</P>
      </Card>
      <div class="text-right">
        <ButtonGroup class="space-x-px">
          <Button size="xs" outline on:click={() => { activePost = post; editingPost = true; }}>Edit</Button>
          <Button size="xs" outline on:click={() => { activePost = post; deletingPost = true; }}>Delete</Button>
        </ButtonGroup>
      </div>
    </section>
  {/each}

  <Modal bind:open={creatingPost} title="Create Post">
    <Textarea bind:value={newPost.body} />
    <Button on:click={addPost}>Create</Button>
  </Modal>

  <Modal bind:open={editingPost} title="Edit Post">
    <Textarea bind:value={activePost.body} />
    <Button on:click={updatePost}>Update</Button>
  </Modal>

  <Modal bind:open={deletingPost} title="Delete Post">
    <P>Are you sure you want to delete this post?</P>
    <Button on:click={removePost}>Delete</Button>
  </Modal>
</section>


<!-- todo: figure out how to implement alternating backgrounds using this logic:
  {post.id % 2 === 0 ? 'bg-gray-300' : 'bg-gray-600'}
-->