// import browser storage
import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// const stored = window.localStorage.storedTodos;

export const todos = writable( []);

export const addTodo = (/** @type {any} */ todo) => {
	todos.update((todos) => {
		if (todo.id) {
			return [...todos, todo];
		}
        else {
		return [...todos, { text: todo, completed: false, id: Date.now() }];
        }
	});
};

export const deleteTodo = (id) => {
	todos.update((todos) => {
		return todos.filter((todo) => todo.id !== id);
	});
};

export const toggleTodoCompleted = (id) => {
	todos.update((todos) => {
		let index = -1;
		for (let i = 0; i < todos.length; i++) {
			if (todos[i].id === id) {
				index = i;
				todos[i].completed = !todos[i].completed;
				break;
			}
		}
		if (index === -1) {
			todos[index].completed = !todos[index].completed;
		}
		return todos;
	});
};


if (browser) {
	// client-only code here
    const stored = window.localStorage.storedTodos;
    if (stored) {
        todos.set(JSON.parse(stored));
    }
    todos.subscribe((todos) => {
        window.localStorage.storedTodos = JSON.stringify(todos);
    } );
}


