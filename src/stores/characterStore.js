import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

const createCharacterStore = () => {
	const store = writable([{
		age: 0,
		bio: '',
		created_at: '',
		gender: '',
		first_name: '',
		last_name: '',
		relationship_status: '',
		species: '',
		soul: '',
		user_id: '',
		id: 0,
	}]);

	const fetchCharacter = async (id) => {
		try {
			if (!id) return null;

			const { data } = await supabase.from('characters').select().eq('id', id);
			
			store.set(data[0]);
			return data[0];

		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const fetchCharacters = async (user_id) => {
		try {
			if (!user_id) return null;
			let { data: characters, error } = await supabase.from('characters').select().eq('user_id', user_id);
			store.set(characters);
			return characters;

		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const addCharacter = async (newCharacter) => {
		try { 
			const { data } = await supabase.from('characters').insert([newCharacter]).select()
			const id = data[0].id;
			window.location.href = `/character/${id}`;
			return data;

		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const updateCharacter = async (updatedCharacter) => {
		try {
			await supabase.from('characters').update([updatedCharacter]).eq('id', updatedCharacter.id);
			const newCharacters = store.get().map((character) => (character.id === updatedCharacter.id ? updatedCharacter : character));
			store.set(newCharacters);
			await loadCharacter(updatedCharacter.id);
			return loadCharacters(updatedCharacter.user_id);

		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const deleteCharacter = async (deletedCharacter) => {
		try {
			await supabase.from('characters').delete().eq('id', deletedCharacter.id)
			window.location.href = `/user/${deletedCharacter.user_id}`;
			return loadCharacters(deletedCharacter.user_id);

		} catch (error) {
			console.error(error);
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