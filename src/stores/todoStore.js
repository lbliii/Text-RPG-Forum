import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

export const todos = writable([]);

export const loadTodos = async () => {
	const { data, error } = await supabase.from('todos').select();
	
	if (error) {
		return console.error(error);
	}
	todos.set(data);
};

export const addTodo = async (text, user_id) => {
	// get the new todos from the database

	const { data, error } = await supabase
		.from('todos')
		.insert([{ text, user_id }])
		.select()

	if (error) {
		return console.error(error);
	}

	loadTodos();
};

 

export const deleteTodo = async (id) => {
	const { error } = await supabase.from('todos').delete().match({ id });

	if (error) {
		return console.error(error);
	}

	todos.update((todos) => todos.filter((todo) => todo.id !== id));
};

export const toggleTodoCompleted = async (id, currentState) => {
	const { error } = await supabase.from('todos').update({ completed: !currentState }).match({ id });

	if (error) {
		return console.error(error);
	}

	todos.update((todos) => {
		let index = -1;
		for (let i = 0; i < todos.length; i++) {
			if (todos[i].id === id) {
				index = i;
				break;
			}
		}
		if (index !== -1) {
			todos[index].completed = !todos[index].completed;
		}
		return todos;
	});
};

export const updateTodo = async (id, text) => {
	const { error } = await supabase.from('todos').update({ text }).match({ id });

	if (error) {
		return console.error(error);
	}
};

loadTodos();