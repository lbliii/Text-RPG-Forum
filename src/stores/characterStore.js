import { writable } from 'svelte/store';
import { handleError } from '../shared/helpers.js';
import {
	getCharacters,
	getCharacter,
	createCharacter,
	deleteCharacter,
	updateCharacter
} from '../shared/actions.js';


const createCharacterStore = () => {
	const store = writable([{}]);

	const fetchCharacter = async (id) => {
		try {
			if (!id) return null;

			const { data } = await getCharacter(id);

			store.set(data);
			return data[0];
		} catch (error) {
			handleError(error);
			return null;
		}
	};

	const fetchCharacters = async (user_id) => {
		try {
			if (!user_id) return null;

			const { data } = await getCharacters(user_id);
			store.set(data);
			return data;
		} catch (error) {
			handleError(error);
			return null;
		}
	};

	const addCharacter = async (newCharacter) => {
		try {
			const { data } = await createCharacter(newCharacter);
			const id = data[0].id;
			window.location.href = `/character/${id}`;
			return data;
		} catch (error) {
			handleError(error);
			return null;
		}
	};

	const updateCharacter = async (updatedCharacter) => {
		try {
			await updateCharacter(updatedCharacter);
			const newCharacters = store
				.get()
				.map((character) => (character.id === updatedCharacter.id ? updatedCharacter : character));
			store.set(newCharacters);
			await fetchCharacter(updatedCharacter.id);
			return fetchCharacters(updatedCharacter.user_id);
		} catch (error) {
			handleError(error);
			return null;
		}
	};

	const deleteCharacter = async (deletedCharacter) => {
		try {
			await deleteCharacter(deletedCharacter);
			window.location.href = `/user/${deletedCharacter.user_id}`;
			return fetchCharacters(deletedCharacter.user_id);
		} catch (error) {
			handleError(error);
			return null;
		}
	};

	return {
		subscribe: store.subscribe,
		fetchCharacter,
		fetchCharacters,
		addCharacter,
		updateCharacter,
		deleteCharacter
	};
};

export const characterStore = createCharacterStore();
