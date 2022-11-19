<script>
    import TodoForm from '../../components/TodoForm.svelte';
    import Todo from '../../components/Todo.svelte';
    import {todos} from '../../stores/todoStore.js';
</script>

<main>
    <h1 class="text-3xl font-bold underline">Todo List</h1>
    <TodoForm />
    {#each $todos as todo}
         <Todo todo={todo} index={todos.id} />
    {/each}
</main>
