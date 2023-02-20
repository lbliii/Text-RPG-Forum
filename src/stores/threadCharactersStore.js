import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

const createThreadCharactersStore = () => {
	const { subscribe, set, update } = writable([]);

	const addCharacter = async ({ user_id, character_id, thread_id }) => {
		try {

			// check if character is already in thread 
			const { data: existingCharacter, error: existingCharacterError } = await supabase
				.from('thread_characters')
				.select('*')
				.eq('thread_id', thread_id)
				.eq('character_id', character_id)

			if (existingCharacter) {
				console.log("character already in thread")
				return;
			}

			const { data, error } = await supabase
				.from('thread_characters')
				.insert([{ user_id, character_id, thread_id }])
				.select()

			if (error) {
				console.error(`Error: ${error.message}`);
				return;
			}

			update((characters) => [...characters, data[0]]);
	
			return data 
		} catch (error) {
			console.error(`Error: ${error.message}`);
		}
	};

	const removeCharacter = async (id) => {
		try {
			const { error } = await supabase.from('thread_characters').delete().match({ id });

			if (error) {
				console.error(`Error: ${error.message}`);
				return;
			}

			update((characters) => characters.filter((character) => character.id !== id));
		} catch (error) {
			console.error(`Error: ${error.message}`);
		}
	};

	const loadCharacters = async (thread_id) => {
		try {
			const { data, error } = await supabase
				.from('thread_characters')
				.select('*')
				.eq('thread_id', thread_id);

			if (error) {
				console.error(`Error: ${error.message}`);
				return;
			}

			set(data);
			return data;
		} catch (error) {
			console.error(`Error: ${error.message}`);
		}
	};

	return {
		subscribe,
		addCharacter,
		removeCharacter,
		loadCharacters
	};
};

export const threadCharactersStore = createThreadCharactersStore();
