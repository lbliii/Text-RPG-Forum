import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';
import { authStore } from './authStore.js';

const createUserStore = () => {
	const store = writable(null);

	const getUser = async () => {
		let user;

		authStore.subscribe((value) => {
			user = value;
		})();
		
		if (!user) return;

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

	authStore.subscribe(() => {
		getUser();
	});

	getUser();

	return {
		subscribe: store.subscribe
	};
};

export const userStore = createUserStore();
