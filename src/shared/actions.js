import { supabase } from '../supabase.js';
import { handleError } from '../shared/helpers.js';

// Get, Create, Update, Delete

// Forum Actions

export const getForums = async () => {
	try {
		return await supabase.from('forums').select('*');
	} catch (error) {
		handleError(error);
	}
};

export const getForum = async (id) => {
	try {
		return await supabase.from('forums').select('*').match({ id });
	} catch (error) {
		handleError(error);
	}
};

export const createForum = async (forum) => {
	try {
		return await supabase.from('forums').insert(forum).select();
	} catch (error) {
		handleError(error);
	}
};

export const deleteForum = async (id) => {
	try {
		await supabase.from('forums').delete().eq('id', id);
	} catch (error) {
		handleError(error);
	}
};

export const updateForum = async (forum) => {
	try {
		return await supabase.from('forums').update(forum).eq('id', forum.id).select();
	} catch (error) {
		handleError(error);
	}
};

// Thread Actions

export const getThreads = async (forum_id) => {
	try {
		return await supabase.from('threads').select('*').match({ forum_id: forum_id });
	} catch (error) {
		handleError(error);
	}
};

export const createThread = async (thread, firstPost) => {
	try {
		const { data } = await supabase.from('threads').insert(thread).select();
		const thread_id = data[0].id;
		const { data: post, error } = await supabase
			.from('posts')
			.insert({ ...firstPost, thread_id: thread_id })
			.select();

		if (error) {
			throw error;
		}

		postStore.addPost(post[0]);
	} catch (error) {
		handleError(error);
	}
};

export const updateThread = async (thread) => {
	try {
		const { data, error } = await supabase
			.from('threads')
			.update({ ...thread })
			.match({ id: thread.id })
			.select();

		if (error) {
			throw error;
		}

		return data[0];
	} catch (error) {
		handleError(error);
	}
};

export const deleteThread = async (thread) => {
	try {
		await supabase.from('threads').delete().match({ id: thread.id });
	} catch (error) {
		handleError(error);
	}
};

// Character Actions

export const getCharacter = async (id) => {
	try {
		const { data } = await supabase.from('characters').select().eq('id', id);
		return data[0];
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getCharacters = async (userId) => {
	try {
		const { data } = await supabase.from('characters').select().eq('user_id', userId);
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const createCharacter = async (character) => {
	try {
		const { data } = await supabase.from('characters').insert([character]).select();
		return data[0];
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const updateCharacter = async (character) => {
	try {
		await supabase.from('characters').update([character]).eq('id', character.id);
		return character;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const deleteCharacter = async (character) => {
	try {
		await supabase.from('characters').delete().eq('id', character.id);
		return true;
	} catch (error) {
		console.error(error);
		return null;
	}
};
