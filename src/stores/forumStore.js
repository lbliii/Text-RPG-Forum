import { writable } from 'svelte/store';
import { handleError } from '../shared/helpers.js';
import { getForum, createForum, deleteForum, updateForum } from '../shared/actions.js';
import { forumsStore } from './forumsStore.js';

// Verbs: Fetch, Add, Edit, Remove

const createForumStore = () => {
	const store = writable({});

	const { subscribe, set, update } = store;

	const fetchForum = async (id) => {
		try {
			const { data: forum } = await getForum(id);
			set(forum)
			return forum
		} catch (error) {
			handleError(error);
		}
	};

	const addForum = async (forum) => {
		try {
			await createForum(forum);
			
			forumsStore.update((forums) => [...forums, forum]);

			set({})
		} catch (error) {
			handleError(error);
		}
	};

	const removeForum = async (forum) => {
		try {
			await deleteForum(forum.id);
			
		} catch (error) {
			handleError(error);
		}
	};

	const editForum = async (forum) => {
		try {
			if (!forum) {
				throw new Error('No forum to edit');
			}

			const { data: editedForum} = await updateForum(forum);
		
			if (!editedForum) {
				throw new Error(`Forum ${forum.id} was not edited.`);
			}
			
			set(editedForum)
		} catch (error) {
			handleError(error);
		}
	};

	return {
		subscribe,
		fetchForum,
		addForum,
		removeForum,
		editForum,
		set,
		update,
	};
};

export const forumStore = createForumStore();
