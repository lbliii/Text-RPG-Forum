<script>
  import { postStore } from '../stores/postStore.js';
  import { accountStore } from '../stores/accountStore.js';
  import { Button, ButtonGroup, CloseButton, Input, Modal, Card, P, Textarea } from 'flowbite-svelte';

  export let thread;

  let user = {};
  let newPost = { body: '' };
  let editingPost = false;
  let deletingPost = false;
  let activePost = {};
  let sortBy = 'latest';

  $: user = $accountStore;

  $: postStore.fetchPosts(thread.id)

  $: sortedPosts = $postStore.sort((a, b) => {
    const sortFactor = sortBy === 'latest' ? -1 : 1;
    return sortFactor * (new Date(a.created_at) - new Date(b.created_at));
  });

  function addPost() {
    postStore.addPost({
      user_id: user.id,
      thread_id: thread.id,
      ...newPost
    });
    newPost = { body: '' };
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

</script>

<section>
  <Card size="lg" padding="sm" class="my-2">
    <Textarea bind:value={newPost.body} placeholder="Enter a new post" class="my-2" />
    <Button on:click={addPost}>Add Post</Button>
  </Card>

  <div class="my-2 text-right">
    <label for="sort-select">Sort by:</label>
    <select id="sort-select" bind:value={sortBy}>
      <option value="latest">Latest</option>
      <option value="oldest">Oldest</option>
    </select>
  </div>

  {#each sortedPosts as post}
    <section class="my-5">
      <Card size="lg" padding="sm" class="my-2" href={`/thread/${thread.id}/post/${post.id}`}>
        <P class="text-2xl font-bold dark:text-white text-center my-6">{post.body}</P>
      </Card>
      <div class="text-right">
        <ButtonGroup class="space-x-px">
          <Button outline on:click={() => { activePost = post; editingPost = true; }}>Edit</Button>
          <Button outline on:click={() => { activePost = post; deletingPost = true; }}>Delete</Button>
        </ButtonGroup>
      </div>
    </section>
  {/each}

  <Modal bind:open={editingPost} title="Edit Post">
    <Textarea bind:value={activePost.body} />
    <Button on:click={updatePost}>Update</Button>
  </Modal>

  <Modal bind:open={deletingPost} title="Delete Post">
    <P>Are you sure you want to delete this post?</P>
    <Button on:click={removePost}>Delete</Button>
  </Modal>
</section>