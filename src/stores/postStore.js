import { writable } from 'svelte/store';
import {
	getPost,
	createPost,
	updatePost,
	deletePost,
	createThreadCharacterLink
} from '../shared/actions.js';
import { handleError } from '../shared/helpers.js';
import { postsStore } from './postsStore.js';


// Verbs: Fetch, Add, Edit, Remove

const createPostStore = () => {
	const store = writable({});

	const { subscribe, set, update } = store;

	const fetchPost = async (post_id) => {
		try {

			if(!post_id) {
				throw new Error('No post_id provided');
			}

			const { data: post} = await getPost(post_id);

			if (!post) {
				throw new Error(`No post found for post_id: ${post_id}`);
			}
			set(post);
			return post;
		} catch (error) {
			handleError(error);
		}
	};

	const addPost = async (post) => {
		try {
			if(!post) {
				throw new Error('No post provided');
			}

			const { data: newPost } = await createPost(post);

			if (!newPost) {
				throw new Error(`No post created for post: Thread ID: ${post.thread_id}, Character ID: ${post.character_id}, User ID: ${post.user_id}, Body: ${post.body}`);
			}

			createThreadCharacterLink(newPost.thread_id, newPost.user_id, newPost.character_id);

			postsStore.update(posts => [...posts, newPost]);

			set({})
		
		} catch (error) {
			handleError(error);
		}
	};

	const editPost = async (post) => {
		try {
			if(!post) {
				throw new Error('No post provided');
			}
			console.log("postStore.js: ", post)
			const { data: updatedPost } = await updatePost(post);

			if (!updatedPost) {
				throw new Error(`No post updated for post: ${post}`);
			}

			postsStore.update((posts) => posts.map((p) => (p.id === post.id ? post : p)));

		} catch (error) {
			handleError(error);
		}
	};

	const removePost = async (post) => {
		try {
			if(!post) {
				throw new Error('No post provided');
			}

			const { data: deletedPost } = await deletePost(post);
		
			postsStore.update((posts) => posts.filter((p) => p.id !== post.id));
		

		} catch (error) {
			handleError(error);
		}
	};




	return {
		fetchPost,
		addPost,
		removePost,
		editPost,
		subscribe,
	};
};

export const postStore = createPostStore();
