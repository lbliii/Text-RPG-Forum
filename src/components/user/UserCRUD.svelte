<script>
    import { userStore } from '../../stores/userStore.js';
    import { playerStore } from '../../stores/playerStore.js';
    import { time_zone } from '../../shared/user-details.js';
    import { Button, Select, Textarea, FloatingLabelInput, Modal, ButtonGroup, Label, Input } from 'flowbite-svelte';
    import  CharacterCRUD  from '../character/CharacterCRUD.svelte';

    export let edit;
    export let player = $playerStore;
    let modalOpen = false;

    const handleSubmit = () => {
        if(player.likes !== null) {
            player.likes = player.likes.replace(/\r?\n/g, '<br />');
        }
        if(player.dislikes !== null) {
            player.dislikes = player.dislikes.replace(/\r?\n/g, '<br />');
        }
        player.user_id = $userStore.user_id;
        player.profile_setup = true;

        playerStore.editPlayer(player);
    
        modalOpen = false;
    }
	
</script>


{#if $userStore.user_id == player.user_id}
    <div class="flex flex-row justify-end my-6">
        <ButtonGroup>
            <Button size="xs" color="light" on:click={() => (modalOpen = true)}> {edit ? 'Edit ' : 'Create'} Profile</Button>
            <CharacterCRUD create={true} player_id={player.user_id} />
        </ButtonGroup>
    </div>
{/if}


<Modal bind:open={modalOpen} size="xs" autoclose={false} title="{edit ? 'Edit ' : 'Create'} Your User Profile">

    <div class="flex flex-col text-sm mb-2">
        <FloatingLabelInput
            id="alias"
            name="alias"
            type="text"
            label="Alias"
            class="mb-4"
            bind:value={player.alias}
            placeholder="Alias (is not unique)"
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

    <Input id="age" name="age" type="number" label="Age" class="mb-4" bind:value={player.age} placeholder="Age" />

    <Label>Likes</Label>
    <Textarea id="likes" name="likes" label="Likes" rows="5" placeholder="Tell other writers what kind of plots and genres you like to write." bind:value={player.likes} />
    <Label>Dislikes</Label>
    <Textarea id="dislikes" name="dislikes" label="Dislikes" rows="5" placeholder="Tell other writers what kind of plots and genres you do not like." bind:value={player.dislikes} />
    
    <div class="flex flex-row justify-center my-2">
        <ButtonGroup>
            <Button color="green" on:click={handleSubmit}>Save</Button>
            <Button color="red" on:click={() => (modalOpen = false)}>Cancel</Button>
        </ButtonGroup>
    </div>
</Modal>