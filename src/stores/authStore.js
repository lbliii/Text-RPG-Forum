import { writable } from 'svelte/store';
import { handleError } from '../shared/helpers.js';
import { getAuth, updateAuth } from '../shared/actions.js';

// Verbs: Fetch, Add, Edit, Remove


const createAuthStore = () => {
	const store = writable({});

	const { subscribe, set, update } = store

	const fetchAuth = async () => {
		try {
			const { data: {user} } = await getAuth();

			if (!user) {
				throw new Error('No user found. Are you logged in?');
			}
			set(user);
			return user
		} catch (error) {
			handleError(error);
		}
	};

	updateAuth((_, session) => {
		set(session?.user || {});
	});


	fetchAuth()

	return {
		subscribe,
		set,
		update,
		fetchAuth,

	};
};

export const authStore = createAuthStore();
