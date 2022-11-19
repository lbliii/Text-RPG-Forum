import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

export const characters = writable([]);

export const loadCharacters = async () => {
    const { data, error } = await supabase.from('characters').select();

    if (error) {
        return console.error(error);
    }
    characters.set(data);
    console.log(characters)
}

export const addCharacter = async (character, user_id) => {
    let first_name = character.first_name;
    let last_name = character.last_name;

    const { data, error } = await supabase
        .from('characters')
        .insert([{ first_name, last_name, user_id }])
        .select()

    if (error) {
        return console.error(error || 'Error adding character');
    }

    loadCharacters();
}

// export const deleteCharacter = async (id) => {
//     const { error } = await supabase.from('characters').delete().match({ id });

//     if (error) {
//         return console.error(error);
//     }

//     characters.update((characters) => characters.filter((character) => character.id !== id));
// }

// export const updateCharacter = async (id) => {
//     // change the name of the character
//     const { error } = await supabase.from('characters').update({ first_name: 'new name' }).match({ id });
// }

loadCharacters();