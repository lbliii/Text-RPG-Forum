import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';
import { authStore } from './authStore.js';

let auth;

authStore.subscribe((value) => {
	auth = value;
});

const createProfileStore = () => {
	const users = writable([]);
	const profile = writable({});

	const handleError = (error) => {
		console.error(error);
		return error;
	};

	const fetchUsers = async () => {
		try {
			const { data } = await supabase.from('users').select();
			users.set(data);
		} catch (error) {
			handleError(error);
		}
	};

	const fetchProfile = async () => {
		try {
			if (auth) {
				const { data } = await supabase.from('users').select().eq('user_id', auth.id);
				profile.set(data[0]);
			}
		} catch (error) {
			handleError(error);
		}
	};

	fetchUsers();
	fetchProfile();

	return {
		users: {
			subscribe: users.subscribe
		},
		profile: {
			subscribe: profile.subscribe
		},
		fetchUsers,
		fetchProfile
	};
};

export const profileStore = createProfileStore();
