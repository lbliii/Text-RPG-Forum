<script>
    import {addCharacter, updateCharacter} from '../stores/characterStore.js';
    import {account} from '../stores/accountStore.js';
    import { Button, Select, Textarea, FloatingLabelInput } from 'flowbite-svelte' 

    // these exports provide an insert for the prop passed in from the parent component
    export let edit;
    export let character

    $: if (character === null || character === undefined) {
        character = {
            user_id: $account.id,
            };
        }

    let gender = [
        {value: 'Androgyne', name: 'Androgyne'},
        {value: 'Cisgender', name: 'Cisgender'},
        {value: 'Bigender', name: 'Bigender'},
        {value: 'Fluid', name: 'Fluid'},
        {value: 'Non-Binary', name: 'Non-Binary'},
        {value: 'Queer', name: 'Queer'},
        {value: 'Transgender', name: 'Transgender'},
    ]
    let soul = [
        {value: 'Ghost', name: 'Ghost'},
        {value: 'Immortal', name: 'Immortal'},
        {value: 'Mortal', name: 'Mortal'},
        {value: 'Undead', name: 'Undead'}
    ]
    let species = [
        {value: 'Alien', name: 'Alien'},
        {value: 'Android', name: 'Android'},
        {value: 'Angel', name: 'Angel'},
        {value: 'Centaur', name: 'Centaur'},
        {value: 'Demon', name: 'Demon'},
        {value: 'Djinn', name: 'Djinn'},
        {value: 'Dragon', name: 'Dragon'},
        {value: 'Dwarf', name: 'Dwarf'},
        {value: 'Elemental', name: 'Elemental'},
        {value: 'Elf', name: 'Elf'},
        {value: 'Fae', name: 'Fae'},
        {value: 'Giant', name: 'Giant'},
        {value: 'Gnome', name: 'Gnome'},
        {value: 'Goblin', name: 'Goblin'},
        {value: 'God/dess', name: 'God/dess'},
        {value: 'Human', name: 'Human'},
        {value: 'Mermaid', name: 'Mermaid'},
        {value: 'Pixie', name: 'Pixie'},
        {value: 'Ogre', name: 'Ogre'},
        {value: 'Orc', name: 'Orc'},
        {value: 'Robot', name: 'Robot'},
        {value: 'Titan', name: 'Titan'},
        {value: 'Troll', name: 'Troll'},
        {value: 'Unicorn', name: 'Unicorn'},
        {value: 'Vampire', name: 'Vampire'},
        {value: 'Werewolf', name: 'Werewolf'},
        {value: 'Other', name: 'Other'}
    ]
    let relationship_status = [
        {value: 'Divorced', name: 'Divorced'},
        {value: 'Married', name: 'Married'},
        {value: 'Open Relationship', name: 'Open Relationship'},
        {value: 'Polyarmorous', name: 'Polyamorous'},
        {value: 'Single', name: 'Single'},
        {value: 'Widowed', name: 'Widowed'}
    ]

    const handleSubmit = () => {
        // if character is empty, do nothing
        if (edit === true) {
            // preserve line breaks for textarea
            updateCharacter(character)
        }
        else {
            addCharacter(character)
        }
    }

 
</script>


<form class="my-6 justify-center" on:submit|preventDefault={handleSubmit} >
    <div class="flex flex-col text-sm mb-2">
        <FloatingLabelInput id="first_name" name="first_name" type="text" label="First Name"  class="mb-4"  bind:value={character.first_name} />

        <FloatingLabelInput id="last_name" name="last_name" type="text" label="Last Name"  class="mb-4"  bind:value={character.last_name} />

        <FloatingLabelInput id="age" name="age" type="number" label="Age"  class="mb-4"  bind:value={character.age} />

        <div class="flex flex-row justify-between my-2">
            <Select id="select-lg" underline size="lg" items={soul} class="mb-6" bind:value={character.soul} placeholder="Soul"/>

            <Select id="select-lg" underline size="lg" items={species} class="mb-6" bind:value={character.species} placeholder="Species"/>
        </div>

        <div class="flex flex-row justify-between my-2">
            <Select id="select-lg" underline size="lg" items={gender} class="mb-6" bind:value={character.gender} placeholder="Gender"/>

            <Select id="select-lg" underline size="lg" items={relationship_status} class="mb-6" bind:value={character.relationship_status} placeholder="Relationship Status"/>
        </div>
        <Textarea type="text" bind:value={character.bio} class="apperance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg" id="bio" name="bio" rows="10" placeholder="Write your character biography here. this does not need to be a literal historical timeline; you can also submit a slice-of-life vignette, poems, bullet points -- whatever you feel is the best representation of your character's personality, motives, and current mental state."></Textarea>

    </div>
    <div class="flex justify-center">
         <Button size="lg" type="submit">Save</Button>
    </div>

    <!-- TODO: Confetti event -->
</form>