import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

const createCharacterStore = () => {
	const store = writable({});

	const handleResponse = (res) => {
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

	const loadCharacter = async (id) => {
		const { data, error } = await supabase
			.from('characters')
			.select()
			.match({ id })
			.then(handleResponse)
			.catch(handleError);

		return handleSuccess({ data, error });
	};

	const loadCharacters = async () => {
		const { data, error } = await supabase
			.from('characters')
			.select('*')
			.then(handleResponse)
			.catch(handleError);

		return handleSuccess({ data, error });
	};

	const loadPlayableCharacters = async (id) => {
		const { data, error } = await supabase
			.from('characters')
			.select('*')
			.match({ user_id: id })
			.then(handleResponse)
			.catch(handleError);

		return handleSuccess({ data, error });
	};

	const addCharacter = async (newCharacter) => {
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

	const updateCharacter = async (updatedCharacter) => {
		const { data, error } = await supabase
			.from('characters')
			.update([updatedCharacter])
			.match({ user_id: updatedCharacter.user_id })
			.then(handleSuccess)
			.catch(handleError)
			.finally(loadCharacters);

		return handleSuccess({ data, error });
	};

	const deleteCharacter = async (deletedCharacter) => {
		const { error } = await supabase
			.from('characters')
			.delete()
			.match({ id: deletedCharacter.id })
			.then(() =>
				store.update((characters) =>
					characters.filter((character) => character.id !== deletedCharacter.id)
				)
			)
			.catch(handleError);

		window.location.href = `/user/${deletedCharacter.user_id}`;

		return handleSuccess({ error });
	};

	return {
		subscribe: store.subscribe,
		loadCharacter,
		loadCharacters,
		loadPlayableCharacters,
		addCharacter,
		updateCharacter,
		deleteCharacter
	};
};

export const characterStore = createCharacterStore();
