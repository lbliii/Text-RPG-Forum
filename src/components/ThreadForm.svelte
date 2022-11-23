<script>
    import {addThread} from '../stores/threadStore.js';
    import {account} from '../stores/accountStore.js';
    import { Button, Select, Textarea, FloatingLabelInput } from 'flowbite-svelte'

    export let edit 
    export let thread

    $: if (thread === null || thread === undefined || thread === '') {
        thread = {
            user_id: $account.id,
            };
        }

    const handleSubmit = () => {
        thread.description = thread.description.replace(/\r?\n/g, '<br />');

        if (edit === true) {
            updateThread(thread);
        } else {
            addThread(thread);
        }

        // reset the form
        thread = {
            user_id: $account.id,
        };
    }

</script>

<form>
    <div class="flex flex-col text-sm mb-2">
        
        <FloatingLabelInput id="title" name="title" type="text" label="Thread Title"  class="mb-4"  bind:value={thread.title} />

        <Textarea type="text" bind:value={thread.description} class="apperance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg" id="description" name="description" rows="5" placeholder="Thread Description here."></Textarea>

        <!-- <Textarea type="text" bind:value={post.body} class="apperance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg" id="post" name="post" rows="10" placeholder="First post content here."></Textarea> -->

    </div>
    <div class="flex justify-center">
         <Button size="lg" type="submit">Save</Button>
    </div>
</form>

