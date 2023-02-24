import { writable } from 'svelte/store';
import { getUsers } from '../shared/actions.js';
import { handleError } from '../shared/helpers.js';

// Fetch, Add, Edit, Remove

const createUsersStore = () => {
	const store = writable([]);

	const { subscribe, set } = store;

	// fetch users from the database
	const fetchUsers = async () => {
		try {
			const { data: users, error } = await getUsers();
			if (error) {
				throw error;
			}
			
			users.sort((a, b) => {
				return a.alias[0].localeCompare(b.alias[0]);
			});

			set(users);
			return users;
		}
		catch (error) {
			handleError(error);
		}
	};

	fetchUsers()
	

	return {
		subscribe,
		fetchUsers,
	};
};

export const usersStore = createUsersStore();
