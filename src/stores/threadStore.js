import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

export const createThreadStore = () => {
	const store = writable([]);

	const handleError = (error) => {
		console.error(error);
		return error;
	};

	const fetchThreads = async (topic_id) => {
		try {
			const { data } = await supabase.from('threads').select('*').match({ topic_id: topic_id });
			store.set(data);
			return data;
		} catch (error) {
			handleError(error);
		}
	};

	const addThread = async (thread) => {
		try {
			await supabase.from('threads').insert(thread);

			console.log('addThread', thread);
		} catch (error) {
			handleError(error);
		}

		fetchThreads(thread.topic_id);
	};

	const updateThread = async (thread) => {
		try {
			const { data, error } = await supabase
				.from('threads')
				.update({ ...thread })
				.match({ id: thread.id })
				.select();

			if (error) {
				throw error;
			}

			// Update the threads store
			store.update((threads) => {
				const index = threads.findIndex((t) => t.id === thread.id);
				if (index !== -1) {
					threads[index] = data[0];
				}
				return threads;
			});

			return data[0];
		} catch (error) {
			handleError(error);
		}
	};

	const deleteThread = async (thread) => {
		try {
			await supabase.from('threads').delete().match({ id: thread.id });
			store.update((threads) => threads.filter((t) => t.id !== thread.id));
		} catch (error) {
			handleError(error);
		}
	};

	return {
		fetchThreads,
		addThread,
		updateThread,
		deleteThread,
		subscribe: store.subscribe
	};
};

export const threadStore = createThreadStore();
