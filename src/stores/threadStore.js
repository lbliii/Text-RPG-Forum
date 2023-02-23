import { writable } from 'svelte/store';
import { createThread, updateThread, deleteThread, getThread } from '../shared/actions.js';
import { handleError } from '../shared/helpers.js';

// Fetch, Add, Edit, Remove

export const createThreadStore = () => {
	const store = writable([{}]);

	const { subscribe, set, update } = store;

	const fetchThread = async (id) => {
		try {
			if (!id) {
				throw new Error('No id provided');
			}
			const {data: thread} = await getThread(id);
			
			if (!thread) {
				throw new Error(`No thread found matching id: ${id}`);
			}
			
			set(thread);
			return thread;
		} catch (error) {
			handleError(error);
		}
	};
			

	const addThread = async (thread, firstPost) => {
		try {

			if (!thread) {
				throw new Error('No thread provided');
			}
			if (!firstPost) {
				throw new Error('No firstPost provided');
			}

			const {data: addedThread} = await createThread(thread, firstPost);

			if (!addedThread) {
				throw new Error('Thread was not saved.');
			}

			return addedThread;
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

			update((threads) => {
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
			update((threads) => threads.filter((t) => t.id !== thread.id));
		} catch (error) {
			handleError(error);
		}
	};

	return {
		fetchThread,
		addThread,
		editThread,
		removeThread,
		subscribe,
	};
};

export const threadStore = createThreadStore();
