import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

export const users = writable([]);

export const loadUser = async () => {

}

export const completeDetails = async (user) => {
    console.log(user);
		const { data, error } = await supabase.from('users').insert([{ ...user }]);

		if (error) {
			return console.error(error);
		}
}


loadUser();