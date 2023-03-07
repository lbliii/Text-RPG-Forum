<script>
    import { threadStore } from '../../stores/threadStore.js';
	import { charactersStore } from '../../stores/charactersStore.js';
    import { Button, ButtonGroup, P, Modal, Input, Textarea, Dropdown, DropdownItem} from 'flowbite-svelte';
    import { EllipsisHorizontalCircle } from 'svelte-heros-v2';
    import { goto } from '$app/navigation';

    export let modalOpen = false;
    export let modalTitle = '';
    export let action = '';
    export let user = {};
    export let forum = {}
	export let thread = {}

    let threadData = {};
    let postData = {
		user_id: user.user_id,
	};

	$: {
		if (user.user_id) {
			charactersStore.fetchCharacters(user.user_id);
		}
	}

    function handleAction() {
        if (action === 'create') {
            threadStore.addThread({
				user_id: user.user_id,
				forum_id: forum.id,
				...threadData}, postData);
        } else if (action === 'edit') {
            threadStore.editThread(threadData);
        } else if (action === 'delete') {
           
            threadStore.removeThread(threadData);
            goto(`/forum/${thread.forum_id}`);

        }
        threadData = {};
        thread = {};
		postData = {};
        modalOpen = false;
    }
</script>


{#if action === 'create'}
	<Button size="xs" color="green" on:click={() => ((modalOpen = true), (modalTitle = 'Create a Thread'))}>Create a Thread</Button>
{:else if thread.user_id === user.user_id}
	<EllipsisHorizontalCircle size="30" class="cursor-pointer" />
	<Dropdown>
		<DropdownItem
			on:click={() => (
				(modalOpen = true), (action = 'edit'), (modalTitle = 'Edit Post'), (threadData = thread)
			)}>Edit</DropdownItem
		>
		<DropdownItem
			on:click={() => (
				(modalOpen = true), (action = 'delete'), (modalTitle = 'Delete Thread'), (threadData = thread)
			)}>Delete</DropdownItem
		>
	</Dropdown>
{/if}

<Modal bind:open={modalOpen} bind:title={modalTitle}>
    <form>
        <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <Input type="text" id="title" class="form-control" bind:value={threadData.title} />
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <Textarea id="description" class="form-control" bind:value={threadData.description} />
        </div>
        {#if action === 'create' }
            {#if $charactersStore.length === 0}
                <P>You must create a character before you can create a thread.</P>
            {:else}
                <Textarea bind:value={postData.body} id="body" name="body" rows="10" placeholder="Enter a post body here." class="my-2" />
                <div>
                    <P>Choose a character to associate with this thread.</P>
                    <select bind:value={postData.character_id} required>
                        {#each $charactersStore as character}
                            {#if character.id !== undefined || character.id !== null}
                                <option value={character.id}>{character.first_name} {character.last_name}</option>
                            {/if}
                        {/each}
                    </select>
                </div>
            {/if}
        {/if}
    </form>

    <ButtonGroup class="space-x-px">
        {#if action === 'edit'}
            <Button size="xs" color="green" on:click={() => handleAction()}>Save</Button>
        {:else if action === 'delete'}
            <Button size="xs" color="red" on:click={() => handleAction()}>Delete</Button>
        {:else if action === 'create'}
            <Button color="green" on:click={() => handleAction()}>Create</Button>
        {/if}
        <Button size="xs" color="dark" on:click={() => (modalOpen = false)}>Cancel</Button>
    </ButtonGroup>
</Modal>
