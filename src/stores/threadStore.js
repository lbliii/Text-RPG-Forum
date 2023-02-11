import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

export const threads = writable([]);
export const thread = writable({});

const handleError = (error) => {
	console.error(error);
	return error;
};

export const loadThreads = async () => {
	const { data, error } = await supabase.from('threads').select();
	if (error) {
		return handleError(error);
	}
	threads.set(data);
};

export const loadThread = async (/** @type {any} */ id) => {
	const { data, error } = await supabase.from('threads').select().match({ thread_id: id });
	if (error) {
		return handleError(error);
	}
	thread.set(data[0]);
};

export const addThread = async (thread) => {
	const { data, error } = await supabase.from('threads').insert([{ ...thread }]);
	if (error) {
		return handleError(error);
	}
	return data;
};

export const updateThread = async (thread) => {
	const { error } = await supabase
		.from('threads')
		.update({ ...thread })
		.match({ thread_id: thread.thread_id });
	if (error) {
		return handleError(error);
	}
	loadThreads();
};

export const deleteThread = async (thread) => {
	const { error } = await supabase.from('threads').delete().match({ id: thread.id });
	if (error) {
		return handleError(error);
	}
	threads.update((threads) => threads.filter((t) => t.id !== thread.id));
};

loadThreads();
