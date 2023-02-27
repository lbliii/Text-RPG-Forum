import { userStore } from '../../../stores/userStore.js';
import { characterStore } from '../../../stores/characterStore.js';

export async function load({ params }) {
	let character_id = params.slug;

	return characterStore.fetchCharacter(character_id);
}
