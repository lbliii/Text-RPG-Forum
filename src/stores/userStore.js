import { writable } from 'svelte/store';
import { authStore } from './authStore.js';
import { getUser, updateUser, createUser, deleteUser } from '../shared/actions.js'
import { handleError } from '../shared/helpers.js';

// Fetch, Add, Edit, Remove

const createUserStore = () => {
	const store = writable({});

	const { subscribe, set, update } = store;

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
		} catch (error) {
			handleError(error);
		}
	};

	const addUser = async (user) => {
		try {
			const { data: addedUser } = await createUser(user);
			if (!addedUser) {
				throw new Error('User not added');
			}
			update((users) => [...users, addedUser]);

			return addedUser;
		}
		catch (error) {
			handleError(error);
		}
	};

	const editUser = async (user) => {
		try {
			const { data: editedUser } = await updateUser(user);
			if (!editedUser) {
				throw new Error('User not edited');
			}
			update((users) => {
				const index = users.findIndex((u) => u.id === editedUser.id);
				if (index === -1) return users;
				users[index] = editedUser;
				return users;
			});
			return editedUser;
		}
		catch (error) {
			handleError(error);
		}
	};

	const removeUser = async (user) => {
		try {
			const { data: deletedUser} = await deleteUser(user);
			if (!deletedUser) {
				throw new Error('User not deleted');
			}
			update((users) => {
				const index = users.findIndex((u) => u.id === deletedUser.id);
				if (index === -1) return users;
				users.splice(index, 1);
				return users;
			});
			return deletedUser;
		}
		catch (error) {
			handleError(error);
		}
	};


	authStore.subscribe(() => {
		fetchUser();
	});

	fetchUser();

	return {
		subscribe,
		addUser,
		editUser,
		removeUser,
		fetchUser,
	};
};

export const userStore = createUserStore();
