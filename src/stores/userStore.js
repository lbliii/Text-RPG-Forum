import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

export const users = writable([]);
export const profile = writable({});

export const completeDetails = async (user) => {
    console.log(user);
		const { data, error } = await supabase.from('users').insert([{ ...user }]);

		if (error) {
			return console.error(error);
		}


}

export async function getUser(id) {
	let abc;
	const { data, error } = await supabase.from('users').select('*').eq('user_id', id).single()

	if (data) {
		console.log(data)
		profile.set(data[0]);
		abc = data[0];

		return abc 

	}

}
 