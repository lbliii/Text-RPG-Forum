import { writable } from 'svelte/store';
import { getThreads, createThread, updateThread, deleteThread } from '../shared/actions.js';
import { handleError } from '../shared/helpers.js';

// Fetch, Add, Edit, Remove

export const createThreadStore = () => {
	const store = writable([{}]);

	const fetchThreads = async (forum_id) => {
		try {
			const {data: threads} = await getThreads(forum_id);
			store.set(threads);
		} catch (error) {
			handleError(error);
		}
	};

	const addThread = async (thread, firstPost) => {
		try {
			await createThread(thread, firstPost);
			await fetchThreads(thread.forum_id);
		} catch (error) {
			handleError(error);
		}
	};

	const editThread = async (thread) => {
		try {
			const data = await updateThread(thread);
			store.update((threads) => {
				const index = threads.findIndex((t) => t.id === thread.id);
				if (index !== -1) {
					threads[index] = data;
				}
				return threads;
			});
		} catch (error) {
			handleError(error);
		}
	};

	const removeThread = async (thread) => {
		try {
			await deleteThread(thread);
			store.update((threads) => threads.filter((t) => t.id !== thread.id));
		} catch (error) {
			handleError(error);
		}
	};

	return {
		fetchThreads,
		addThread,
		editThread,
		removeThread,
		subscribe: store.subscribe
	};
};

export const threadStore = createThreadStore();
