import { writable } from 'svelte/store';
import {
	createThread,
	updateThread,
	deleteThread,
	getThread,
	createPost,
	createThreadCharacterLink
} from '../shared/actions.js';
import { handleError } from '../shared/helpers.js';
import {threadsStore} from './threadsStore.js';
import { goto } from '$app/navigation';

// Fetch, Add, Edit, Remove

export const createThreadStore = () => {
	const store = writable({});

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

			const {data: addedThread} = await createThread(thread);

			if (!addedThread) {
				throw new Error('Thread was not saved.');
			}

			firstPost.thread_id = addedThread.id; 


			const {data: addedPost} = await createPost(firstPost);

			if (!addedPost) {
				throw new Error('Post was not saved.');
			}

			const {data: link} = await createThreadCharacterLink(addedThread.id, firstPost.user_id, firstPost.character_id);

			if (!link) {
				throw new Error(`Link was not saved for thread: ${addedThread.id}, user ${firstPost.user_id}, character: ${firstPost.character_id}`);
			}

			threadsStore.update((threads) => [...threads, addedThread]);
			
			set({})
			goto(`/thread/${addedThread.id}`);

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

			set(thread);
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
