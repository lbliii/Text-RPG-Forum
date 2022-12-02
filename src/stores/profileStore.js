import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

export const users = writable([]);
export const profile = writable({});

export const completeProfileDetails = async (/** @type {any} */ user) => {

	const { data, error } = await supabase.from('users').insert([{ ...user }]);

	if (error) {
		return console.error(error);
	}
}

export const updateProfileDetails = async (/** @type {any} */ user) => {

	const { data, error } = await supabase.from('users').update([{ ...user }]).match({ user_id: user.user_id });

	if (error) {
		return console.error(error);
	}

	loadProfiles();
}


export const loadProfiles = async () => {
	const { data, error } = await supabase.from('users').select();

	if (error) {
		return console.error(error);
	}

	users.set(data);
};

export const loadProfile = async (/** @type {any} */ id) => {

	let user_id;
	if (!id) {
		return
	}
	 user_id = id;
	const { data, error } = await supabase.from('users').select().match({ user_id }).then(res => {
		profile.set(res.data[0]);
	});

	if (error) {
		return console.error(error);
	}
	
};

export const getProfile = async (/** @type {any} */ id) => {

	const res = await supabase.from('users').select().match({ user_id: id });

	if (res.error) {
		return console.error(res.error);
	}

	let profile = res.data[0];

	return profile;

}
	

loadProfile()
loadProfiles()