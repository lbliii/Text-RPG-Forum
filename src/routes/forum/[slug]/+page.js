import { forumStore } from '../../../stores/forumStore.js';
import { handleError } from '../../../shared/helpers.js';

export async function load({ params }) {
	const id = params.slug;

	try {
		return forumStore.fetchForum(id);
	
	} catch (error) {
		handleError(error);
	}
}
