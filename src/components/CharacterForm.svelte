<script>
    let character = {};
    import {addCharacter} from '../stores/characterStore.js';
    import {account} from '../stores/authStore.js';
    const handleSubmit = () => {
        // if character is empty, do nothing
        if (!character) return;
        addCharacter(character, $account.id);
        console.log("Submitting character...")
        console.log(character)
        character = {};
    }
</script>

<form class="my-6" on:submit|preventDefault={handleSubmit} >
    <div class="flex flex-col text-sm mb-2">
        <label class="font-bold mb-2 text-gray-800" for="firstN">First Name</label>
        <input type="text" bind:value={character.first_name} class="apperance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg" id="firstN" name="firstN" placeholder="Alan" />

        <label class="font-bold mb-2 text-gray-800" for="lastN">Last Name</label>
        <input type="text" bind:value={character.last_name} class="apperance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg" id="lastN" name="lastN" placeholder="Watts" />

        <label class="font-bold mb-2 text-gray-800" for="age">Age</label>
        <input type="number" bind:value={character.age} class="apperance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg" id="age" name="age" placeholder="28" />

        <label class="font-bold mb-2 text-gray-800" for="bio">Bio</label>

        <textarea type="text" bind:value={character.bio} class="apperance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg" id="bio" name="bio" placeholder="Alan Watts was a British philosopher who interpreted Eastern philosophy for a Western audience. He is best known as an interpreter and populariser of Asian philosophies for a Western audience."></textarea>

    </div>
    <button type="submit" class="w-full shadow-sm rounded bg-green-500 hover:bg-green-600 text-white py-2 px-4" >Create Character</button>
</form>