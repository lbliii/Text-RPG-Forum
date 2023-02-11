import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

export const users = writable([]);
export const profile = writable({});

const handleError = (error) => {
	if (error) {
		console.error(error);
		return true;
	}

	return false;
};

export const completeProfileDetails = async (user) => {
	const { error } = await supabase.from('users').insert([{ ...user }]);

	handleError(error);
};

export const updateProfileDetails = async (user) => {
	const { error } = await supabase
		.from('users')
		.update([{ ...user }])
		.match({ user_id: user.user_id });

	handleError(error);
	loadProfiles();
};

export const loadProfiles = async () => {
	const { data, error } = await supabase.from('users').select();

	if (handleError(error)) return;

	users.set(data);
};

export const loadProfile = async (id) => {
	if (!id) return;

	const { data, error } = await supabase.from('users').select().match({ user_id: id });

	if (handleError(error)) return;

	profile.set(data[0]);
};

export const getProfile = async (id) => {
	const { data, error } = await supabase.from('users').select().match({ user_id: id });

	if (handleError(error)) return;

	return data[0];
};

loadProfile();
loadProfiles();
