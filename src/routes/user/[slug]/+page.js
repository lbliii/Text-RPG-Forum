import {playerStore} from '../../../stores/playerStore.js';

export async function load({ params }) {
	let player_id = params.slug;

	return await playerStore.fetchPlayer(player_id);
}




