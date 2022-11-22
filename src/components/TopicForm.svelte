<script>
    import {addTopic, updateTopic} from '../stores/topicStore.js';
    import {account} from '../stores/accountStore.js';
    import { Button, Select, Textarea, FloatingLabelInput } from 'flowbite-svelte'

    export let edit; 
    export let topic;

     $: if (topic === null || topic === undefined) {
        topic = {
            user_id: $account.id,
            };
        }

    const handleSubmit = () => {
        // store character.bio as html in the database
        topic.description = topic.description.replace(/\r?\n/g, '<br />');
        if (edit === true) {

            updateTopic(topic);
        } else {
            addTopic(topic);
        }
    }
</script>

<form class="my-6 justify-center" on:submit|preventDefault={handleSubmit} >
    <div class="flex flex-col text-sm mb-2">
        <FloatingLabelInput id="title" name="title" type="text" label="Topic Title"  class="mb-4"  bind:value={topic.title} />

        <Textarea type="text" bind:value={topic.description} class="apperance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg" id="description" name="description" rows="5" placeholder="Topic Description here."></Textarea>

    </div>
    <div class="flex justify-center">
         <Button size="lg" type="submit">Save</Button>
    </div>

    <!-- TODO: Confetti event -->
</form>