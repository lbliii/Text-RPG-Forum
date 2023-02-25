import { writable } from 'svelte/store';
import { handleError } from '../shared/helpers.js';
import { getCharacter, createCharacter, deleteCharacter, updateCharacter } from '../shared/actions.js';

// Verbs: Fetch, Add, Edit, Remove


const createCharacterStore = () => {
	const store = writable({});

	const { subscribe, set, update } = store;

	const fetchCharacter = async (id) => {
		try {

			if (!id) {
				throw new Error('No id provided for the character');
			}

			const { data: character } = await getCharacter(id);

			if (!character) {
				throw new Error(`No character found matching id: ${id}`);
			}

			set({});
			return character;
		} catch (error) {
			handleError(error);
			return null;
		}
	};


	const addCharacter = async (newCharacter) => {
		try {

			if (!newCharacter) {
				throw new Error('No character details provided');
			}

			const { data: character } = await createCharacter(newCharacter);

			if (!character) {
				throw new Error(`Character ${newCharacter.first_name} was not created.`);
			}

			window.location.href = `/character/${character[0].id}`;
			return character[0];
		} catch (error) {
			handleError(error);
			return null;
		}
	};

	const editCharacter = async (character) => {
		try {
			const {data: editedCharacter} = await updateCharacter(character);

			if (!editedCharacter) {
				throw new Error(`Character ${character.first_name} was not updated.`);
			}

			update(editedCharacter);
			return editedCharacter;
		} catch (error) {
			handleError(error);
		}
	};

	const deleteCharacter = async (deletedCharacter) => {
		try {
			await deleteCharacter(deletedCharacter);
			window.location.href = `/user/${deletedCharacter.user_id}`;
		} catch (error) {
			handleError(error);
			return null;
		}
	};

	return {
		subscribe,
		fetchCharacter,
		addCharacter,
		editCharacter,
		deleteCharacter,
	};
};

export const characterStore = createCharacterStore();
