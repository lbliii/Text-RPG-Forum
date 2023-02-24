import { writable } from 'svelte/store';
import { handleError } from '../shared/helpers.js';
import { getThreadCharacterLinks} from '../shared/actions.js';

const createThreadCharactersStore = () => {
	const store = writable([{}]);

	const { subscribe, set, update } = store;
	
	const fetchThreadCharacters = async (thread_id) => {
		try {
			if (!thread_id) {
				throw new Error('No thread_id provided');
			}
			const { data: links } = await getThreadCharacterLinks(thread_id);

			if (!links) {
				throw new Error(`No links found matching thread: ${thread_id}`);
			}
			
			set(links);
			return links;
		} catch (error) {
			handleError(error);
		}
	};
 

	return {
		fetchThreadCharacters,
		subscribe,

	};
};

export const threadCharactersStore = createThreadCharactersStore();
