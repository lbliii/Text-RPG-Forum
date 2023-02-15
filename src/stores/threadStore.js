import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

export const createThreadStore = () => {
	const threads = writable([]);
	const thread = writable(null);

	const loadThreads = async (topic_id) => {
		try {
			const { data } = await supabase.from('threads').select().match({ topic_id: topic_id });
			threads.set(data);
			return data;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const loadThread = async (thread) => {
		try {
			const { data } = await supabase.from('threads').select().match({ id: thread.id });
			thread.set(data[0]);
		} catch (error) {
			console.error(error);
			thread.set(null);
		}
	};

	const addThread = async (topic_id, thread) => {
		try {
			const { data } = await supabase.from('threads').insert([{ ...thread }]);

			threads.update((threads) => [...threads, data[0]]);
			console.log('addThread', data[0]);
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const updateThread = async (thread) => {
		try {
			const { data, error } = await supabase
				.from('threads')
				.update({ ...thread })
				.match({ id: thread.id })
				.select()

			if (error) {
				throw error;
			}

			// Update the threads store
			threads.update((threads) => {
				const index = threads.findIndex((t) => t.id === thread.id);
				if (index !== -1) {
					threads[index] = data[0];
				}
				return threads;
			});

			return data[0];
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const deleteThread = async (thread) => {
		try {
			await supabase.from('threads').delete().match({ id: thread.id });
			threads.update((threads) => threads.filter((t) => t.id !== thread.id));
		} catch (error) {
			console.error(error);
			return null;
		}
	};


	return {
		threads,
		thread,
		loadThreads,
		loadThread,
		addThread,
		updateThread,
		deleteThread
	};
};

export const threadStore = createThreadStore();
