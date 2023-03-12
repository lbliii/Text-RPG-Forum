import { characterStore } from '../../../stores/characterStore.js';

export async function load({ params }) {
	let id = params.slug;

	return characterStore.fetchCharacter(id);
}
