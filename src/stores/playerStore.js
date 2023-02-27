import { writable } from 'svelte/store';
import { getUser } from '../shared/actions.js'
import { handleError } from '../shared/helpers.js';

// Fetch, Add, Edit, Remove

const createPlayerStore = () => {
	const store = writable({});

	const { subscribe, set } = store;

	const fetchPlayer = async (player_id) => {

		try {
			const { data } = await getUser(player_id);

			if (!data) {
				throw new Error('Player not found');
			}

			set(data);
			return data;
		} catch (error) {
			handleError(error);
		}
	};


	return {
		subscribe,
		fetchPlayer
	};
};

export const playerStore = createPlayerStore();
