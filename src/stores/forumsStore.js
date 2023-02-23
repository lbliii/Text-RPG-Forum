import { writable } from 'svelte/store';
import { handleError } from '../shared/helpers.js';
import { getForums } from '../shared/actions.js';

// Fetch, Add, Edit, Remove

const createForumStore = () => {
	const store = writable([{}]);

	const { subscribe, set } = store;

	const fetchForums = async () => {
		try {
			const { data: forums } = await getForums();
			set(forums);
			return forums;
		} catch (error) {
			handleError(error);
		}
	};


	fetchForums();

	return {
		subscribe,
		fetchForums,

	};
};

export const forumsStore = createForumStore();
