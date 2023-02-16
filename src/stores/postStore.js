import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

const createPostStore = () => {
	const store = writable([]);

	const handleError = (error) => {
		console.error(error);
		return error;
	};

	const fetchPosts = async (thread_id) => {
		try {
			const { data } = await supabase.from('posts').select().match({ thread_id: thread_id });
			store.set(data);
			return data;
		} catch (error) {
			handleError(error);
		}
	};

	const addPost = async (post) => {
		try {
			await supabase.from('posts').insert(post);
			console.log('addPost', post)
			store.update((posts) => [...posts, post]);
			await fetchPosts(post.thread_id);
			return post;
		} catch (error) {
			handleError(error);
		}
	};


	const deletePost = async (post) => {
		try {
			const id = post.id;
			await supabase.from('posts').delete().match({ id });
			store.update((posts) => posts.filter((p) => p.id !== id));
		} catch (error) {
			handleError(error);
		}
	};

	const updatePost = async (post) => {
		try {
			const id = post.id;
			await supabase
				.from('posts')
				.update({ ...post })
				.match({ id });
			store.update((posts) => posts.map((p) => (p.id === id ? post : p)));
		} catch (error) {
			handleError(error);
		}
	};

	return {
		fetchPosts,
		addPost,
		deletePost,
		updatePost,
		subscribe: store.subscribe
	};
};

export const postStore = createPostStore();
