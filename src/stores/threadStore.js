import { writable } from 'svelte/store';
import { createThread, updateThread, deleteThread } from '../shared/actions.js';
import { handleError } from '../shared/helpers.js';

// Fetch, Add, Edit, Remove

export const createThreadStore = () => {
	const store = writable([{}]);

	const addThread = async (thread, firstPost) => {
		try {

			if (!thread) {
				throw new Error('No thread provided');
			}
			if (!firstPost) {
				throw new Error('No firstPost provided');
			}

			await createThread(thread, firstPost);
		} catch (error) {
			handleError(error);
		}
	};

	const editThread = async (thread) => {
		try {
			if (!thread) {
				throw new Error('No thread provided');
			}
			const {data: editedThread} = await updateThread(thread);

			if (!editedThread) {
				throw new Error(`No thread found matching id: ${thread.id}`);
			}

			store.update((threads) => {
				const index = threads.findIndex((t) => t.id === thread.id);
				if (index !== -1) {
					threads[index] = editedThread;
				}
				return threads;
			});
		} catch (error) {
			handleError(error);
		}
	};

	const removeThread = async (thread) => {
		try {

			if (!thread) {
				throw new Error('No thread provided');
			}
			
			await deleteThread(thread);
			store.update((threads) => threads.filter((t) => t.id !== thread.id));
		} catch (error) {
			handleError(error);
		}
	};

	return {
		addThread,
		editThread,
		removeThread,
		subscribe: store.subscribe
	};
};

export const threadStore = createThreadStore();
