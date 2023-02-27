import { threadStore } from '../../../stores/threadStore.js';

export async function load({ params }) {
	let id = params.slug;

	return threadStore.fetchThread(id);
}