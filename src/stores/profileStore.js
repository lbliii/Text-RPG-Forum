import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

const createProfileStore = () => {
	const users = writable([]);
	const profile = writable({});

	const fetchUsers = async () => {
		try {
			const { data } = await supabase.from('users').select();
			users.set(data);
		} catch (error) {
			console.error(error);
		}
	};

	const fetchProfile = async (id) => {
		try {
			const { data } = await supabase.from('users').select().eq('user_id', id);
			profile.set(data[0]);
		} catch (error) {
			console.error(error);
		}
	};

	const completeProfileDetails = async (user) => {
		try {
			await supabase.from('users').insert([{ ...user, profile_setup: true}]);
		} catch (error) {
			console.error(error);
		}
	};

	const updateProfileDetails = async (user) => {
		try {
			await supabase
				.from('users')
				.update([{ ...user }])
				.eq('user_id', user.user_id);
			fetchProfile(user.user_id);
		} catch (error) {
			console.error(error);
		}
	};

	fetchUsers();

	return {
		users: {
			subscribe: users.subscribe
		},
		profile: {
			subscribe: profile.subscribe
		},
		completeProfileDetails,
		updateProfileDetails,
		fetchProfile
	};
};

export const profileStore = createProfileStore();
