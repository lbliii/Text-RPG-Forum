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

export const loadProfile = async (id) => {
	let user_id = id;
	const { data, error } = await supabase.from('users').select().match({ user_id });

	if (error) {
		return console.error(error);
	}
	profile.set(data[0]);
};

 

export const loadUsers = async () => {
	const { data, error } = await supabase.from('users').select();

	if (error) {
		return console.error(error);
	}
	users.set(data);
	console.log(users);
};

loadUsers()