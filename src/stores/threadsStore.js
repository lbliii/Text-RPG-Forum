import { writable } from 'svelte/store';
import { getThreads,} from '../shared/actions.js';
import { handleError } from '../shared/helpers.js';

// Fetch, Add, Edit, Remove

export const createThreadStore = () => {
	const store = writable([{}]);

	const fetchThreads = async (forum_id) => {
		try {

			if (!forum_id) {
				throw new Error('No forum_id provided');
			}

			const {data: threads} = await getThreads(forum_id);

			if (!threads) {
				throw new Error(`No threads found matching forum: ${forum_id}`);
			}
			
			store.set(threads);
		} catch (error) {
			handleError(error);
		}
	};

	return {
		fetchThreads,
		subscribe: store.subscribe
	};
};

export const threadsStore = createThreadStore();
