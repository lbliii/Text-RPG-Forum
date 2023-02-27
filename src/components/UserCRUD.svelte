<script>
    import { userStore } from '../stores/userStore.js';
    import { playerStore } from '../stores/playerStore.js';
    import { time_zone } from '../shared/user-details.js';
    import { Button, Select, Textarea, FloatingLabelInput, Modal, ButtonGroup, Label } from 'flowbite-svelte';
    import  CharacterCRUD  from './CharacterCRUD.svelte';

    export let edit;
    export let player = $playerStore;
    let openModal = false;
	
</script>


{#if $userStore.user_id == player.user_id}
    <div class="flex flex-row justify-end my-2">
        <ButtonGroup>
            <Button color="light" on:click={() => (openModal = true)}> {edit ? 'Edit ' : 'Create'} Profile</Button>
            <CharacterCRUD create={true} player={player} />
        </ButtonGroup>
    </div>
{/if}

<Modal bind:open={openModal} size="xs" autoclose={false} title="{edit ? 'Edit ' : 'Create'} Your User Profile">

    <div class="flex flex-col text-sm mb-2">
        <FloatingLabelInput
            id="alias"
            name="alias"
            type="text"
            label="Alias"
            class="mb-4"
            bind:value={player.alias}
        />

        <Select
            id="time_zone"
            underline
            size="sm"
            items={time_zone}
            class="mb-6"
            bind:value={player.time_zone}
            placeholder="Time Zone"
        />
    </div>

    <Label>Likes</Label>
    <Textarea id="likes" name="likes" label="Likes" bind:value={player.likes} />
    <Label>Dislikes</Label>
    <Textarea id="dislikes" name="dislikes" label="Dislikes" bind:value={player.dislikes} />
    
    <div class="flex flex-row justify-center my-2">
        <ButtonGroup>
            <Button color="green" on:click={() => (openModal = false)}>Save</Button>
            <Button color="red" on:click={() => (openModal = false)}>Cancel</Button>
        </ButtonGroup>
    </div>
</Modal>