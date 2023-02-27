import { forumStore } from '../../../stores/forumStore.js';

export async function load({ params }) {
	const id = params.slug;

	return forumStore.fetchForum(id);
}
