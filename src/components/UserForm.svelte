<script>

    import {profileStore} from '../stores/profileStore.js';
    import {accountStore} from '../stores/accountStore.js';
    import { Label, Button, Select, Textarea, FloatingLabelInput } from 'flowbite-svelte' 

    export let edit;
    export let profile; 

    $: if (profile === null || profile === undefined) {
        profile = {
            user_id: $accountStore.id,
            };
        }

    let time_zone = [
        {value: 'ESD', name: 'Eastern Standard Time'},
        {value: 'CSD', name: 'Central Standard Time'},
        {value: 'MST', name: 'Mountain Standard Time'},
        {value: 'PST', name: 'Pacific Standard Time'}
    ]

    const handleSubmit = () => {
        if (!profile) return;
        profile.likes = profile.likes.replace(/\r?\n/g, '<br />');
        profile.dislikes = profile.dislikes.replace(/\r?\n/g, '<br />');
        (edit === true) ? profileStore.updateProfileDetails(profile) : profileStore.completeProfileDetails(profile);
    };

</script>


<form class="my-6 justify-center" on:submit|preventDefault={handleSubmit} >
    <div class="flex flex-col text-sm mb-2">
        <FloatingLabelInput id="alias" name="alias" type="text" label="Alias (must be unique)"  class="mb-4"  bind:value={profile.alias} />

        <FloatingLabelInput id="age" name="age" type="number" label="Age"  class="mb-4"  bind:value={profile.age} />

        <div class="flex flex-row justify-between my-2">
            <Select id="select-lg" underline size="sm" items={time_zone} class="mb-6" bind:value={profile.time_zone} placeholder="Time Zone"/>
            
        </div>
        <Label>Likes</Label>
        <Textarea type="text" bind:value={profile.likes} class="apperance-none shadow-sm border border-gray-200 p-2 m-2 focus:outline-none focus:border-gray-500 rounded-lg" id="likes" name="likes" rows="5" placeholder="Tell other writers what kind of plots and genres you like to write."></Textarea>
        <Label>Dislikes</Label>
        <Textarea type="text" bind:value={profile.dislikes} class="apperance-none shadow-sm border border-gray-200 p-2 m-2 focus:outline-none focus:border-gray-500 rounded-lg" id="dislikes" name="dislkes" rows="5" placeholder="Tell other writers what kind of plots and genres you do not like."></Textarea>

    </div>
    <div class="flex justify-center">
         <Button size="lg" type="submit">Save</Button>
    </div>

    <!-- TODO: Confetti event -->
</form>