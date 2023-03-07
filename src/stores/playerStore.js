import { writable } from 'svelte/store';
import {
	getUser,
	updateUser,
	createUser,
	deleteUser,
	getPlayerThreadParticipationCount
} from '../shared/actions.js';
import { handleError } from '../shared/helpers.js';

// Fetch, Add, Edit, Remove

const createPlayerStore = () => {
	const store = writable({});

	const { subscribe, set, update } = store;

	const fetchPlayer = async (player_id) => {

		try {
			const { data } = await getUser(player_id);

			if (!data) {
				throw new Error('Player not found');
			}

			set(data);
			return data;
		} catch (error) {
			handleError(error);
		}
	};

	const fetchPlayerThreadParticipationCount = async (player_id) => {

		try {
			console.log('player_id', player_id)
			const { data } = await getPlayerThreadParticipationCount(player_id);

			if (!data) {
				throw new Error('Player not found');
			}

			return data.length;
		} catch (error) {
			handleError(error);
		}
	};

	const editPlayer = async (player) => {
		try {
			const { data } = await updateUser(player);

			if (!data) {
				throw new Error('Player not found');
			}

			set(data);
			return data;
		} catch (error) {
			handleError(error);
		}
	};

	const addPlayer = async (player) => {
		try {
			const { data, error } = await createUser(player);

			if (!data) {
				throw new Error('Player not found');
			}

			set(data);
			return data;
		} catch (error) {
			handleError(error);
		}
	};


	const removePlayer = async (player_id) => {
		try {
			const { data } = await deleteUser(player_id);

			if (!data) {
				throw new Error('Player not found');
			}

			set(data);
			return data;
		} catch (error) {
			handleError(error);
		}
	};


	return {
		subscribe,
		fetchPlayer,
		fetchPlayerThreadParticipationCount,
		editPlayer,
		addPlayer,
		removePlayer
	};
};

export const playerStore = createPlayerStore();
