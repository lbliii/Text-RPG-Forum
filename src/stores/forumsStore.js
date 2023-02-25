import { writable } from 'svelte/store';
import { handleError } from '../shared/helpers.js';
import { getForums } from '../shared/actions.js';

// Verbs: Fetch, Add, Edit, Remove

const createForumStore = () => {
	const store = writable([{}]);

	const { subscribe, set, update } = store;

	const fetchForums = async () => {
		try {
			const { data: forums } = await getForums();

			forums.sort((a, b) => {
				return a.title[0].localeCompare(b.title[0]);
			});
			
			set(forums);
			return forums;
		} catch (error) {
			handleError(error);
		}
	};


	

	return {
		subscribe,
		fetchForums,
		update,
		set 

	};
};

export const forumsStore = createForumStore();
