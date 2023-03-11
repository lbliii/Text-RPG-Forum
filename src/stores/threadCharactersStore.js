import { writable } from 'svelte/store';
import { handleError } from '../shared/helpers.js';
import { getThreadCharacterLinks, getCharacter} from '../shared/actions.js';

const createThreadCharactersStore = () => {
	
	const store = writable([{}]);

	const { subscribe, set, update } = store;
	
	const fetchThreadCharacters = async (thread_id) => {
		try {
			let characters = [];

			if (!thread_id) {
				throw new Error('No thread_id provided');
			}
			const { data: characterIds } = await getThreadCharacterLinks(thread_id);

			if (!characterIds) {
				throw new Error(`No links found matching thread: ${thread_id}`);
			}

			characterIds.forEach(async (id) => {
				const { data: character } = await getCharacter(id);
				if (!character) {
					throw new Error(`No character found matching id: ${id}`);
				}
				characters.push(character);

			});

			set(characters);
			return characters;
			

		} catch (error) {
			handleError(error);
		}
	};
 

	return {
		fetchThreadCharacters,
		subscribe,
		set,
		update,

	};
};

export const threadCharactersStore = createThreadCharactersStore();
