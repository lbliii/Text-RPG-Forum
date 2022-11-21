import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

export const characters = writable([]);

export const loadCharacters = async () => {
    const { data, error } = await supabase.from('characters').select();

    if (error) {
        return console.error(error);
    }
    characters.set(data);
}

export const addCharacter = async (character) => {
    console.log(character)
    const { data, error } = await supabase
        .from('characters')
        .insert([{ ...character }])

    if (error) {
        return console.error(error);
    }
    loadCharacters();
  
}

export const deleteCharacter = async (id) => {
    const { error } = await supabase.from('characters').delete().match({ id });

    if (error) {
        return console.error(error);
    }

    characters.update((characters) => characters.filter((character) => character.id !== id));
}



loadCharacters();