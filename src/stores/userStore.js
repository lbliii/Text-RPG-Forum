import { writable } from 'svelte/store';
import { getAuth, getUser, createUser } from '../shared/actions.js'
import { handleError } from '../shared/helpers.js';

// Fetch, Add, Edit, Remove

const createUserStore = () => {
	const store = writable({});

	const { subscribe, set,  } = store;

	const fetchUser = async () => {


		try {
			const { data: auth } = await getAuth();

			if (!auth.user.id) {
				console.warn('No auth found. Are you logged in?');
				return;
			} else {
				// try to get the user if one exists from the users table 
				const { data: user } = await getUser(auth.user.id);
				set(user);
				return user;
			}

			
		} catch (error) {
			handleError(error);
		}
	};


	fetchUser();

	return {
		subscribe,
		fetchUser,
	};
};

export const userStore = createUserStore();
