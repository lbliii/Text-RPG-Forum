import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';
import { authStore } from './authStore.js';

const createUserStore = () => {
	const store = writable({
		admin: false,
		age: 0,
		alias: '',
		dislikes: '',
		likes: '',
		profile_setup: false,
		time_zone: '',
		user_id: ''
	});

	const getUser = async () => {
		let user;

		authStore.subscribe((value) => {
			user = value;
		})();

		if (!user.id) return;

		try {
			const { data, error } = await supabase
				.from('users')
				.select('*')
				.eq('user_id', user.id)
				.single();

			if (error) {
				console.error(`Error: ${error.message}`);
				return;
			}

			store.set(data);
		} catch (error) {
			console.error(`Error: ${error.message}`);
		}
	};

	const get = async () => {
		await getUser();
		let x 
		store.subscribe((value) => 
			x = value); 
		return x
	};

	authStore.subscribe(() => {
		getUser();
	});

	getUser();

	return {
		subscribe: store.subscribe,
		get
	};
};

export const userStore = createUserStore();
