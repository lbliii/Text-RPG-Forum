import { supabase } from '../supabase.js';
import { handleError } from '../shared/helpers.js';

// Get, Create, Update, Delete

// .select() returns an array of objects
// .single() returns a single object

// Auth Actions

export const getAuth = async () => {
	try {
		return await supabase.auth.getUser()
	} catch (error) {
		handleError(error);
	}
};

export const updateAuth = (callback) => {
	supabase.auth.onAuthStateChange(callback);
};

// Character Actions

export const getCharacters = async (user_id) => {
	try {
		const { data, error } = await supabase
			.from('characters')
			.select('*')
			.match({ user_id: user_id });
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};

export const getCharacter = async (id) => {
	try {
		const { data, error } = await supabase.from('characters').select().eq('id', id).single();
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};

export const createCharacter = async (character) => {
	try {
		const { data, error } = await supabase.from('characters').insert([character]).select().single();
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};

export const updateCharacter = async (character) => {
	try {
		const { data, error } = await supabase
			.from('characters')
			.update([character])
			.eq('id', character.id)
			.select()
			.single();
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);;
	}
};

export const deleteCharacter = async (character) => {
	try {
		const {data, error} = await supabase.from('characters').delete().eq('id', character.id);
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};

// Forum Actions

export const getForums = async () => {
	try {
		const { data, error } = await supabase.from('forums').select('*');
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};

export const getForum = async (id) => {
	try {
		const { data, error } = await supabase.from('forums').select('*').match({ id }).single();
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};

export const createForum = async (forum) => {
	try {
		const { data, error } = await supabase.from('forums').insert(forum).select().single();
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};

export const updateForum = async (forum) => {
	try {
		const { data, error } = await supabase
			.from('forums')
			.update(forum)
			.eq('id', forum.id)
			.select()
			.single();
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};

export const deleteForum = async (id) => {
	try {
		const {data, error} = await supabase.from('forums').delete().eq('id', id);
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};

// Post Actions

export const getPosts = async (thread_id) => {
	try {
		const { data, error } = await supabase
			.from('posts')
			.select('*')
			.match({ thread_id: thread_id });
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};

export const getPost = async (id) => {
	try {
		const { data, error } = await supabase.from('posts').select().match({ id }).single();
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};

export const createPost = async (post) => {
	try {
		const { data, error } = await supabase.from('posts').insert(post).select().single();
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};

export const updatePost = async (post) => {
	try {
		const { data, error } = await supabase
			.from('posts')
			.update({
				body: post.body,
				updated_at: new Date(),
				character_id: post.character_id
			})
			.match({ id: post.id })
			.select();
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};

export const deletePost = async (post) => {
	try {
		const {data, error} = await supabase.from('posts').delete().match({ id: post.id });
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};

// Thread Actions

export const getForumThreads = async (forum_id) => {
	try {
		const { data, error } = await supabase
			.from('threads')
			.select('*')
			.match({ forum_id: forum_id });
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};


export const getThread = async (id) => {
	try {
		const { data, error } = await supabase.from('threads').select().match({ id }).single();
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};

export const createThread = async (thread) => {
	try {
		const { data, error } = await supabase.from('threads').insert(thread).select().single();
		if (error) throw error;
		return {data};
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
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};

export const deleteThread = async (thread) => {
	try {
		const {data, error} = await supabase.from('threads').delete().match({ id: thread.id });
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};


// User Actions

export const getUsers = async () => {
	try {
		const { data, error } = await supabase.from('users').select('*');
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
}

export const getUser = async (user_id) => {
	try {
		const { data, error } = await supabase.from('users').select().eq('user_id', user_id).single();

		if (!data) {
			// creates a new user if one doesn't exist for the authenticated user.
			const { data, error } = await supabase.from('users').insert({ user_id }).select().single();
			if (error) throw error;
			return {data};
		}
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};

export const createUser = async (user) => {
	try {
		const { data, error } = await supabase.from('users').insert([user]).select().single();
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
}

export const updateUser = async (user) => {
	try {
		const { data, error } = await supabase
			.from('users')
			.update([user])
			.eq('user_id', user.user_id)
			.select()
			.single();
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
}

export const deleteUser = async (user) => {
	try {
		const {data, error} = await supabase.from('users').delete().eq('user_id', user.user_id);
		if (error) throw error;
		return {data} ;
	} catch (error) {
		handleError(error);
	}
}


// Thread <-> Character Junction Table Actions

export const getThreadCharacterLinks = async (thread_id) => {
	try {
		const { data, error } = await supabase
			.from('thread_characters')
			.select('*')
			.match({ thread_id: thread_id });
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
}

export const getThreadCharacterLink = async (thread_id, user_id, character_id) => {
	try {
		const { data, error } = await supabase
			.from('thread_characters')
			.select()
			.match({ thread_id, user_id, character_id })
			.single();
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};

export const getCharacterThreadLinks = async (character_id) => {
	try {
		const { data, error } = await supabase
			.from('thread_characters')
			.select('*')
			.match({ character_id })

		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
}

export const getCharacterThreads = async (character_id) => {
	try {
		const { data: characterThreadLinks} = await getCharacterThreadLinks(character_id);
		
		const thread_ids = characterThreadLinks.map((link) => link.thread_id);
		const { data, error } = await supabase
			.from('threads')
			.select('*')
			.in('id', thread_ids);
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
}

export const createThreadCharacterLink = async (thread_id, user_id, character_id) => {
	try {

		const { data: link_check } = await getThreadCharacterLink(thread_id, user_id, character_id);

		if (link_check !== null )  {
			throw new Error("Link already exists for this thread + user + character combination.")
		}

		const { data, error } = await supabase
			.from('thread_characters')
			.insert({ thread_id: thread_id, user_id: user_id, character_id: character_id })
			.select();
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};

export const updateThreadCharacterLink = async (thread_id, user_id, character_id) => {
	try {
		const { data, error } = await supabase
			.from('thread_characters')
			.update(character_id)
			.match({ thread_id: thread_id, user_id: user_id })
			.select();
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};

export const deleteThreadCharacterLink = async (thread_id, user_id) => {
	try {
		const { data, error } = await supabase
			.from('thread_characters')
			.delete()
			.match({ thread_id: thread_id, user_id: user_id });
		if (error) throw error;
		return {data};
	} catch (error) {
		handleError(error);
	}
};