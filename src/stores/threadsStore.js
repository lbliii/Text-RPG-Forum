import { writable } from 'svelte/store';
import { getThreads,} from '../shared/actions.js';
import { handleError } from '../shared/helpers.js';

// Fetch, Add, Edit, Remove

export const createThreadStore = () => {
	const store = writable([{}]);

	const { subscribe, set, update } = store;

	const fetchThreads = async (forum_id) => {
		try {
			if (!forum_id) {
				throw new Error('No forum_id provided');
			}

			const {data: threads} = await getThreads(forum_id);

			if (!threads) {
				throw new Error(`No threads found matching forum: ${forum_id}`);
			}
			threads.sort((a, b) => {
				return new Date(a.created_at) - new Date(b.created_at);
			});
			
			set(threads);
			return threads;
		} catch (error) {
			handleError(error);
		}
	};

	return {
		fetchThreads,
		subscribe,
		set,
		update,
	};
};

export const threadsStore = createThreadStore();
