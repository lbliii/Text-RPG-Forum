<script>
    import {addPost, updatePost} from '../stores/postStore.js';
    import {account} from '../stores/accountStore.js';
    import {Button, Select, Textarea } from 'flowbite-svelte'


    export let edit; 
    export let thread;
    export let editPost = {}

    let post 

    if (editPost) {
        post = editPost
    }
    else {
        post = {
            user_id: $account.id,
            thread: thread.id,
        }
    }
    
    const handleSubmit = () => {
        post.body = post.body.replace(/\r?\n/g, '<br />');

        if (edit === true) {
            updatePost(post)
        } else {
            addPost(post);
        }

        // reset the form
        post = {
            user_id: $account.id,
        };
    }

</script>


<form class="my-6 justify-center" on:submit|preventDefault={handleSubmit}>
    <div class="flex flex-col text-sm mb-2"> 
        <Textarea type="text" bind:value={post.body} class="apperance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg" id="post" name="post" rows="10" placeholder="post content here."></Textarea> 
    </div>


    <div class="flex justify-center">
         <Button size="lg" type="submit">Save</Button>
    </div>

</form>