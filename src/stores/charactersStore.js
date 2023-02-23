import { writable } from 'svelte/store';
import { handleError } from '../shared/helpers.js';
import { getCharacters } from '../shared/actions.js';

// Verbs: Fetch, Add, Edit, Remove

const createCharacterStore = () => {
	const store = writable([{}]);

	const { subscribe, set, update } = store;

	const fetchCharacters = async (user_id) => {
		try {

			if (!user_id) {
				throw new Error('No user_id provided');
			}

			const { data: characters } = await getCharacters(user_id);

			if (!characters) {
				throw new Error(`No characters found matching user: ${user_id}`);
			}

			set(characters);
			return characters;
		} catch (error) {
			handleError(error);
			return null;
		}
	};

	return {
		subscribe,
		fetchCharacters,
		update 
	};
};

export const charactersStore = createCharacterStore();
