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

			const data  = await getThreadCharacterLinks(thread_id);

			if (!data) {
				throw new Error(`No links found matching thread: ${thread_id}`);
			}

		

			for (let i = 0; i < data.length; i++) {
				const {data: character} = await getCharacter(data[i].character_id);
				characters.push(character);
			}

			console.log(characters)
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
