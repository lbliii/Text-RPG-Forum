<script>
	import { characterStore } from '../stores/characterStore.js';
	import { userStore } from '../stores/userStore.js';
	import { Button, ButtonGroup, P, Modal, Input, Textarea, Dropdown, DropdownItem, Chevron } from 'flowbite-svelte';
	import { EllipsisHorizontalCircle } from 'svelte-heros-v2';
	import { goto } from '$app/navigation';
	import CharacterForm from './CharacterCRUD.svelte';

	export let character = $characterStore;

	let openEditModal = false;
	let openDeleteModal = false;

	function handleEdit() {
		characterStore.editCharacter(character);
		openEditModal = false;
		character = $characterStore;
	}

	function handleDelete() {
		characterStore.removeCharacter(character);
		openDeleteModal = false;
		goto(`/user/${character.user_id}`);
	}
</script>

{#if $userStore.user_id === character.user_id }
	<div class="flex flex-row justify-end items-center my-2">
		<EllipsisHorizontalCircle size="30" class="text-green-900 cursor-pointer"  />
		<Dropdown >
			<DropdownItem on:click={() => (openEditModal = true)}>Edit</DropdownItem>
			<DropdownItem  on:click={() => (openDeleteModal = true)} >Delete</DropdownItem>
		</Dropdown>
	</div>
{/if}

<Modal bind:open={openEditModal} title="Edit Character">
	
	<CharacterForm character={character} />

	<ButtonGroup class="space-x-px">
		<Button size="xs" color="green" on:click={() => handleEdit()}>Save</Button>
		<Button size="xs" color="red" on:click={() => (openEditModal = false)}>Cancel</Button>
	</ButtonGroup>
</Modal>

<Modal bind:open={openDeleteModal} title="Delete {character.first_name} {character.last_name}?">
	<P>Are you sure you want to delete this character?</P>
	<ButtonGroup class="space-x-px">
		<Button size="xs" color="red" on:click={() => handleDelete()}>Delete</Button>
		<Button size="xs" color="green" on:click={() => (openDeleteModal = false)}>Cancel</Button>
	</ButtonGroup>
</Modal>
