import { writable } from 'svelte/store';
import { getForumThreads, getCharacterThreadLinks} from '../shared/actions.js';
import { handleError } from '../shared/helpers.js';

// Fetch, Add, Edit, Remove

export const createThreadStore = () => {
	const store = writable([{}]);

	const { subscribe, set, update } = store;

	const fetchForumThreads = async (forum_id) => {
		try {
			if (!forum_id) {
				throw new Error('No forum_id provided');
			}

			const {data: threads} = await getForumThreads(forum_id);

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

	const fetchCharacterThreads = async (character_id) => {
		try {
			if (!character_id) {
				throw new Error('No character_id provided');
			}
			const { data: links } = await getCharacterThreadLinks(character_id);

			if (!links) {
				throw new Error(`No links found matching character: ${character_id}`);
			}

			set(links);
			return links;
		} catch (error) {
			handleError(error);
		}
	};

	return {
		fetchForumThreads,
		fetchCharacterThreads,
		subscribe,
		set,
		update,
	};
};

export const threadsStore = createThreadStore();
