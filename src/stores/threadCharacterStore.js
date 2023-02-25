import { writable } from 'svelte/store';
import { handleError } from '../shared/helpers.js';
import { getThreadCharacterLink, createThreadCharacterLink, updateThreadCharacterLink, deleteThreadCharacterLink } from '../shared/actions.js';

const createThreadCharacterStore = () => {
	const store = writable({});

	const { subscribe, set, update } = store;


	const fetchThreadCharacter = async (thread_id, user_id) => {	
		try {
			if (!thread_id) {
				throw new Error('No thread_id provided');
			}
			if (!user_id) {
				throw new Error('No user_id provided to fetch thread character link.');
			}
			const { data: link } = await getThreadCharacterLink(thread_id, user_id);

			if (!link) {
				throw new Error(`No link found matching thread: ${thread_id} and for user: ${user_id}`);
			}

			set(link);
			return link;
		} catch (error) {
			handleError(error);
		}
	};

	const addCharacter = async (thread_id, user_id, character_id) => {
		try {
			const { data: link } = await createThreadCharacterLink(thread_id, user_id, character_id);

			if (!link) {
				throw new Error(
					`No link created for user: ${user_id} and character: ${character_id} on thread ${thread_id}.`
				);
			}

			update((links) => [...links, link]);
			return link;
		} catch (error) {
			handleError(error);
		}
	};

	const editCharacter = async (thread_id, user_id, character_id) => {
		try {
			const { data: link } = await updateThreadCharacterLink(thread_id, user_id, character_id);

			if (!link) {
				throw new Error(
					`No link created for user: ${user_id} and character: ${character_id} on thread ${thread_id}.`
				);
			}

			update((links) => [...links, link]);

			return link;
		} catch (error) {
			handleError(error);
		}
	};

	const removeCharacter = async (thread_id, user_id) => {
		try {
			const { data: link } = await deleteThreadCharacterLink(thread_id, user_id);

			if (!link) {
				throw new Error(
					`No link removed for user: ${user_id} on thread ${thread_id}.`
				);
			}

			update((links) => [...links, link]);

			return link;
		} catch (error) {
			handleError(error);
		}
	};

	
	return {
		fetchThreadCharacter,
		subscribe,
		addCharacter,
		editCharacter,
		removeCharacter,
		
	};
};

export const threadCharactersStore = createThreadCharacterStore();
