import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

const createCharacterStore = () => {
	const store = writable([]);

	const loadCharacter = async (id) => {
		const { data } = await supabase
			.from('characters')
			.select()
			.eq('id', id)
			.then((res) => res.data[0])
			.catch((error) => {
				console.error(error);
				return null;
			});

		return data;
	};

	const loadCharacters = async (user_id) => {
		let { data: characters, error } = await supabase.from('characters').select().eq('user_id', user_id);
		if (error) {
			console.error(error);
			return null;
		}
		console.log(characters[0].first_name)
		store.set(characters);
		return characters;
	};

	const addCharacter = async (newCharacter) => {
		const { data } = await supabase
			.from('characters')
			.insert([newCharacter])
			.select()
			.catch((error) => {
				console.error(error);
				return null;
			});

		const id = data[0].id;
		window.location.href = `/character/${id}`;

		return data;
	};

	const updateCharacter = async (updatedCharacter) => {
		await supabase
			.from('characters')
			.update([updatedCharacter])
			.eq('id', updatedCharacter.id)
			.catch((error) => {
				console.error(error);
			});

		return loadCharacters(updatedCharacter.user_id);
	};

	const deleteCharacter = async (deletedCharacter) => {
		await supabase
			.from('characters')
			.delete()
			.eq('id', deletedCharacter.id)
			.catch((error) => {
				console.error(error);
			});

		window.location.href = `/user/${deletedCharacter.user_id}`;

		return loadCharacters(deletedCharacter.user_id);
	};

	return {
		subscribe: store.subscribe,
		loadCharacter,
		loadCharacters,
		addCharacter,
		updateCharacter,
		deleteCharacter
	};
};

export const characterStore = createCharacterStore();
