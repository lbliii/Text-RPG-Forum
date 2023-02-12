// import {writable} from 'svelte/store';
 
// export const account = writable(false);

import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

const createAccountStore = () => {
	const store = writable({});

	const handleSession = ({ data, error }) => {
		if (error) {
			console.error(`Error: ${error.message}`);
			return;
		}

		if (data.session) {
			store.set(data.session.user);
			loadProfile(data.session.user.id);
		}
	};

	supabase.auth.getSession().then(handleSession).catch(console.error);

	supabase.auth.onAuthStateChange((_, session) => {
		store.set(session?.user || {});
	});

	return {
		subscribe: store.subscribe,
		set: (account) => {
			store.set(account);
		}
	};
};

export const account = createAccountStore();