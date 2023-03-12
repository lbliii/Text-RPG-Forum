<script>
	import { characterStore } from '../../stores/characterStore.js';
	import { charactersStore } from '../../stores/charactersStore.js';
	import { userStore } from '../../stores/userStore.js';
	import {playerStore} from '../../stores/playerStore.js'
	import { avatars, gender, soul, species, relationship_status} from '../../shared/character-details.js';
	import { Avatar, Button, Select, Textarea, FloatingLabelInput, Modal, ButtonGroup, P, Heading  } from 'flowbite-svelte';
	import {Trash} from 'svelte-heros-v2'

	export let create = false
	export let player = $playerStore
	export let character = {
		user_id: $userStore.user_id
	};

	$: {
		if (player) {
		charactersStore.fetchCharacters(player.user_id)
		}


	}

	let openModal = false;
	let deleteConfirmed = false;

	const handleSubmit = () => {

		character.bio = character.bio.replace(/\r?\n/g, '<br />');

		if (create) {
			characterStore.addCharacter(character);
		} else {
			characterStore.editCharacter(character);
		}

		openModal = false;
		}

	const handleDelete = async () => {
		await characterStore.removeCharacter(character);
		deleteConfirmed = false;
	}
	
</script>

{#if $userStore.user_id == player}
	{#if create}
		<Button size="xs" color="green" on:click={() => (openModal = true)}> Create Character</Button>
	{:else}
		<div class="flex flex-row justify-end my-6">
		<ButtonGroup> 
			<Button color="green" on:click={() => (openModal = true)}> {create ? 'Create ' : 'Edit'} Character</Button>
		</ButtonGroup>
	</div>
	{/if}
{/if}

<Modal bind:open={openModal} size="xs" autoclose={false} title="{create ? 'Create ' : 'Edit'}  Character">

	{#if create == true && $charactersStore.length < 3 } 

		<div class="flex flex-row justify-between items-center">
			<select id="avatar-select" name="avatar-select" bind:value={character.avatar} class="h-fit">
				{#each avatars as avatar}
					<option value={avatar.value}>{avatar.name}</option>
				{/each}
			</select>
			<Avatar size="xl" src="{character.avatar}"/>
		</div>

		<div class="flex flex-col text-sm mb-2">
			<div class="flex flex-row justify-between "> 
				<FloatingLabelInput
				id="first_name"
				name="first_name"
				type="text"
				label="First Name"
				class="mb-4"
				bind:value={character.first_name}
				/>

				<FloatingLabelInput
					id="last_name"
					name="last_name"
					type="text"
					label="Last Name"
					class="mb-4"
					bind:value={character.last_name}
				/>
			</div>
			

			<FloatingLabelInput
				id="age"
				name="age"
				type="number"
				label="Age"
				class="mb-4"
				bind:value={character.age}
			/>

			<div class="flex flex-row justify-between my-2">
				<Select
					id="select-lg"
					underline
					size="sm"
					items={soul}
					class="mb-6"
					bind:value={character.soul}
					placeholder="Soul"
				/>

				<Select
					id="select-lg"
					underline
					size="sm"
					items={species}
					class="mb-6"
					bind:value={character.species}
					placeholder="Species"
				/>
			</div>

			<div class="flex flex-row justify-between my-2">
				<Select
					id="select-lg"
					underline
					size="sm"
					items={gender}
					class="mb-6"
					bind:value={character.gender}
					placeholder="Gender"
				/>

				<Select
					id="select-lg"
					underline
					size="sm"
					items={relationship_status}
					class="mb-6"
					bind:value={character.relationship_status}
					placeholder="Relationship Status"
				/>
			</div>
			<Textarea
				type="text"
				bind:value={character.bio}
				class="apperance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg"
				id="bio"
				name="bio"
				rows="10"
				placeholder="Write your character biography here. this does not need to be a literal historical timeline; you can also submit a slice-of-life vignette, poems, bullet points -- whatever you feel is the best representation of your character's personality, motives, and current mental state."
			/>
		</div>
		<div class="flex justify-center">
			<Button color="green" size="lg" type="submit" on:click={handleSubmit}> {create ? 'Create ' : 'Save Changes'} </Button>
			{#if character.id !== undefined && deleteConfirmed }
				<Button  color="red" size="xs" type="submit" class="mx-2" on:click={handleDelete}> <Trash/>  </Button>
			{:else if character.id !== undefined && !deleteConfirmed}
				<Button outline color="dark" size="xs" type="submit" class="mx-2" on:click={() => (deleteConfirmed = true)}> <Trash/> </Button>
			{/if}
			
		</div>

	{:else}

		<div class="flex flex-col justify-center items-center">
			<Heading tag="h2" class="mb-4">You have reached the maximum number of characters.</Heading>
			<P> If you would like to create a new character, please delete one of your existing characters first.</P>
		</div>

	{/if}

</Modal>

