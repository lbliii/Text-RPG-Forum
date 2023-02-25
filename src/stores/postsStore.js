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

			// sort post from oldest to newest by created_at 

			posts.sort((a, b) => {
				return new Date(a.created_at) - new Date(b.created_at);
			});


			set(posts);
			return posts;
		} catch (error) {
			handleError(error);
		}
	};



	return {
		fetchPosts,
		subscribe,
		set,
		update
	};
};

export const postsStore = createPostStore();
