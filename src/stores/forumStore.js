import { writable } from 'svelte/store';
import { handleError } from '../shared/helpers.js';
import { getForum, createForum, deleteForum, updateForum } from '../shared/actions.js';

// Verbs: Fetch, Add, Edit, Remove

const createForumStore = () => {
	const store = writable([{}]);

	const { subscribe, set, update } = store;

	const fetchForum = async (id) => {
		try {
			const { data: forum } = await getForum(id);
			set(forum);
			return forum;
		} catch (error) {
			handleError(error);
		}
	};

	const addForum = async (forum) => {
		try {
			await createForum(forum);
			update((forums) => [...forums, forum]);
			return forum;
		} catch (error) {
			handleError(error);
		}
	};

	const removeForum = async (forum) => {
		try {
			await deleteForum(forum.id);
			update((forums) => forums.filter((f) => f.id !== forum.id));
		} catch (error) {
			handleError(error);
		}
	};

	const editForum = async (forum) => {
		try {
			await updateForum(forum);
			update((forums) => forums.map((f) => (f.id === forum.id ? forum : f)));
			return forum;
		} catch (error) {
			handleError(error);
		}
	};

	return {
		subscribe,
		fetchForum,
		addForum,
		removeForum,
		editForum
	};
};

export const forumStore = createForumStore();
