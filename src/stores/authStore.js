import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';
import { handleError } from '../shared/helpers.js';
import { getAuth } from '../shared/actions.js';

// Verbs: Fetch, Add, Edit, Remove


const createAuthStore = () => {
	const store = writable({});

	const handleSession = ({ data, error }) => {
		if (error) {
			console.error(`Error: ${error.message}`);
			return;
		}

		if (data.session) {
			store.set(data.session.user);
		}
	};

	supabase.auth.getSession().then(handleSession).catch(console.error);

	supabase.auth.onAuthStateChange((_, session) => {
		store.set(session?.user || {});
	});

	const get = async () => {
		try {
			const { data: { user } } = await supabase.auth.getUser();
			store.set(user);
			return user
		} catch (error) {
			console.error(`Error: ${error.message}`);
		}
	};

	return {
		subscribe: store.subscribe,
		set: (auth) => {
			store.set(auth);
		},
		get
	};
};

export const authStore = createAuthStore();
