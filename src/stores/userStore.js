import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

export const users = writable([]);
export const profile = writable(null);

export const completeDetails = async (user) => {
    console.log(user);
		const { data, error } = await supabase.from('users').insert([{ ...user }]);

		if (error) {
			return console.error(error);
		}


}

export const loadUser = async () => {
	const { data, error } = await supabase.from('users').select();

	if (error) {
		return console.error(error);
	}
	profile.set(data[0]);
};

loadUser()