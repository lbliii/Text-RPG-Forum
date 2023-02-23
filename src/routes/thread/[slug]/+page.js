import { threadStore } from '../../../stores/threadStore.js';

export async function load({ params }) {
	let id = params.slug;

	let thread = await threadStore.fetchThread(id);

	return thread;
}