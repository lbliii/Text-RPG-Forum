import { writable } from 'svelte/store';
import { authStore } from './authStore.js';
import { getUser } from '../shared/actions.js'
import { handleError } from '../shared/helpers.js';

// Fetch, Add, Edit, Remove

const createUserStore = () => {
	const store = writable({});

	const { subscribe, set,  } = store;

	const fetchUser = async () => {
		let user;

		authStore.subscribe((value) => {
			user = value;
		})();

		if (!user.id) return;

		try {
			const { data: loggedInUser} = await getUser(user.id);

			if (!loggedInUser) {
				throw new Error('User not found');
			}

			set(loggedInUser);
			return loggedInUser;
		} catch (error) {
			handleError(error);
		}
	};

	


	authStore.subscribe(() => {
		fetchUser();
	});

	fetchUser();

	return {
		subscribe,
		fetchUser,
	};
};

export const userStore = createUserStore();
