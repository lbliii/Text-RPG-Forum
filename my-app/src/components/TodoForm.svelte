<script>
    let todo = '';
    import {addTodo} from '../stores/todoStore.js';
    const handleSubmit = () => {
        // if input is empty, do nothing
        if (!todo) return;
        addTodo(todo);
        console.log("Submitting...")
        console.log(window.localStorage.storedTodos)
        todo = '';
    }
</script>

<form class="my-6" on:submit|preventDefault={handleSubmit} >
    <div class="flex flex-col text-sm mb-2">
        <label class="font-bold mb-2 text-gray-800" for="todo">Todo</label>
        <input type="text" bind:value={todo} class="apperance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg" id="todo" name="todo" placeholder="What ya need done?" />
        <button type="submit" class="w-full shadow-sm rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4" >Submit</button>
    </div>
</form>