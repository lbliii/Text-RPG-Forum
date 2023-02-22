<script>
  import { forumStore } from '../stores/forumStore.js';
  import { Button, ButtonGroup, Card, Heading, P, Modal, Input, Textarea } from 'flowbite-svelte';
  import { writable } from 'svelte/store';

  export let user;
  const newForum = writable({ title: '', description: '', image: '' });
  let searchTerm = "";
  let sortedForums = [];
  let filteredForums = [];
  let addForum = false;

    $: {
        
        sortedForums = $forumStore.slice().sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
        
        if (searchTerm) {
        
        filteredForums = sortedForums.filter((forum) => {
            return forum.title.toLowerCase().includes(searchTerm.toLowerCase());
        });
        } else {
        filteredForums =sortedForums;
        }
    }

function createForum() {
    forumStore.addTopic({
      user_id: user.user_id,
      ...$newForum
    });
    newForum.set({ title: '', description: '', image: '' });
    addForum = false;
  }

</script>


<section>
    {#if user && user.admin && user.admin !== undefined}
        <div class="flex flex-row justify-end my-2">
            <ButtonGroup class="space-x-px">
                <Button size="xs" color="green" on:click={() => addForum = true}> Create Forum</Button>
            </ButtonGroup>
        </div>
    {/if}
    <div class="flex justify-end items-center my-2">
        <input type="text" placeholder="Search forums" bind:value={searchTerm} class="border border-gray-400 rounded-md p-2 w-1/3" />
    </div>
    {#if filteredForums.length > 0}
        {#each filteredForums as forum}
            <div class="my-2">
                <Card size="lg" padding="sm" img="{forum.image}" href={`/forum/${forum.id}`}>
                <Heading size="md" class="text-center">{forum.title}</Heading>
                {#if forum.description}
                    <P class="text-center">{forum.description}</P>
                {/if}
                </Card>
            </div>
        {/each}
    {:else}
        <div class="my-2">
            <Card size="lg" padding="sm">
                <Heading size="md" class="text-center">loading...</Heading>
            </Card>
        </div>
    {/if}
</section>

<Modal bind:open={addForum} title="Create Topic">
  <Input bind:value={$newForum.title} placeholder="Enter a new topic." class="my-2" />
  <Textarea bind:value={$newForum.description} id="description" name="description" placeholder="Enter a description here." class="my-2" />
  <Input bind:value={$newForum.image} placeholder="Enter an image url." class="my-2" />
  <Button color="green" on:click={createForum}>Create</Button>
</Modal>

