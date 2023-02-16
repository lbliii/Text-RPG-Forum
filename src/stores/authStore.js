import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

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

	return {
		subscribe: store.subscribe,
		set: (auth) => {
			store.set(auth);
		}
	};
};

export const authStore = createAuthStore();
