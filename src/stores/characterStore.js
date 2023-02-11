import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

const createCharacterStore = () => writable({});
const createCharactersStore = () => writable([]);

export const character = createCharacterStore();
export const characters = createCharactersStore();
export const playableCharacters = createCharactersStore();

const handleResponse = (store) => (res) => {
	store.set(res.data);
};

const handleError = (error) => {
	console.error(error);
};

const handleSuccess = (res) => {
	if (res.error) {
		return handleError(res.error);
	}
	return res.data;
};

export const loadCharacter = async (id) => {
	const { data, error } = await supabase
		.from('characters')
		.select()
		.match({ id })
		.then(handleResponse(character))
		.catch(handleError);

	return handleSuccess({ data, error });
};

export const loadCharacters = async () => {
	const { data, error } = await supabase
		.from('characters')
		.select('*')
		.then(handleResponse(characters))
		.catch(handleError);

	return handleSuccess({ data, error });
};

export const loadPlayableCharacters = async (id) => {
	const { data, error } = await supabase
		.from('characters')
		.select('*')
		.match({ user_id: id })
		.then(handleResponse(playableCharacters))
		.catch(handleError);

	return handleSuccess({ data, error });
};

export const addCharacter = async (newCharacter) => {
	const { data, error } = await supabase
		.from('characters')
		.insert([newCharacter])
		.select()
		.then(handleSuccess)
		.catch(handleError);

	const id = data[0].id;
	window.location.href = `/character/${id}`;

	return handleSuccess({ data, error });
};

export const updateCharacter = async (updatedCharacter) => {
	const { data, error } = await supabase
		.from('characters')
		.update([updatedCharacter])
		.match({ user_id: updatedCharacter.user_id })
		.then(handleSuccess)
		.catch(handleError)
		.finally(loadCharacters);

	return handleSuccess({ data, error });
};

export const deleteCharacter = async (deletedCharacter) => {
	const { error } = await supabase
		.from('characters')
		.delete()
		.match({ id: deletedCharacter.id })
		.then(() =>
			characters.update((characters) =>
				characters.filter((character) => character.id !== deletedCharacter.id)
			)
		)
		.catch(handleError);

	window.location.href = `/user/${deletedCharacter.user_id}`;

	return handleSuccess({ error });
};

loadCharacters();
