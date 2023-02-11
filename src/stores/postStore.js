import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

export const posts = writable([]);
export const post = writable({});

const handleError = (error) => {
	console.error(error);
	return error;
};

export const loadPosts = async (id) => {
	try {
		const { data } = await supabase.from('posts').select().match({ thread: id });
		posts.set(data);
	} catch (error) {
		handleError(error);
	}
};

export const addPost = async (post) => {
	try {
		await supabase.from('posts').insert([{ ...post }]);
		await loadPosts(post.thread);
	} catch (error) {
		handleError(error);
	}
};

export const deletePost = async (post) => {
	try {
		const id = post.id;
		await supabase.from('posts').delete().match({ id });
		posts.update((posts) => posts.filter((p) => p.id !== id));
	} catch (error) {
		handleError(error);
	}
};

export const updatePost = async (post) => {
	try {
		const id = post.id;
		await supabase
			.from('posts')
			.update({ ...post })
			.match({ id });
	} catch (error) {
		handleError(error);
	}
};
