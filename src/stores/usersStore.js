import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

const createUsersStore = () => {
	const store = writable([]);

	const { subscribe, set, update } = store;

	// fetch users from the database
	const loadUsers = async () => {
		const { data: users, error } = await supabase.from('users').select('*');

		if (error) {
			console.error(error);
		} else {
			set(users);
		}
	};

	// add a new user to the database
	const addUser = async (user) => {
		const { data, error } = await supabase.from('users').insert(user);

		if (error) {
			console.error(error);
		} else {
			update((users) => [...users, data[0]]);
		}
	};

	// update a user in the database
	const updateUser = async (user) => {
		const { error } = await supabase.from('users').update(user).eq('user_id', user.id);

		if (error) {
			console.error(error);
		} else {
			update((users) => {
				const index = users.findIndex((u) => u.id === user.id);
				if (index !== -1) {
					const newUsers = [...users];
					newUsers[index] = user;
					return newUsers;
				} else {
					return users;
				}
			});
		}
	};

	// delete a user from the database
	const deleteUser = async (user) => {
		const { error } = await supabase.from('users').delete().eq('user_id', user.id);

		if (error) {
			console.error(error);
		} else {
			update((users) => users.filter((u) => u.id !== user.id));
		}
	};

	loadUsers()

	return {
		subscribe,
		loadUsers,
		addUser,
		updateUser,
		deleteUser
	};
};

export const usersStore = createUsersStore();
