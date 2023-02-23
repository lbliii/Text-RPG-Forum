import { writable } from 'svelte/store';
import { getPosts } from '../shared/actions.js';
import { handleError } from '../shared/helpers.js';


// Verbs: Fetch, Add, Edit, Remove

const createPostStore = () => {
	const store = writable([{}]);

	const { subscribe, set, update } = store;

	const fetchPosts = async (thread_id) => {
		try {

			if(!thread_id) {
				throw new Error('No thread_id provided');
			}

			const { data: posts} = await getPosts(thread_id);

			if (!posts) {
				throw new Error(`No posts found for thread_id: ${thread_id}`);
			}

			set(posts);
			return posts;
		} catch (error) {
			handleError(error);
		}
	};


	return {
		fetchPosts,
		subscribe,
	};
};

export const postStore = createPostStore();
