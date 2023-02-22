import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

const createForumStore = () => {
	const store = writable([{
		id: 0,
		title: '',
		child_topics: [0],
		description: '',
		has_children: false,
		has_parent: false,
		image: '',
		parent_id: 0,
		tags: [],
		user_id: ''
	}]);

	const { subscribe, set, update } = store;

	const handleError = (error) => {
		console.error(error);
		return error;
	}; 

	const get = async () => {
		try {
			const { data: forums } = await supabase.from('topics').select('*');
			set(forums);
			return forums
		} catch (error) {
			handleError(error);
		}
	};

	const fetchForum = async (id) => {
		try {
			const { data } = await supabase.from('topics').select('*').match({ id });
			set(data[0]);
			return data[0]
		} catch (error) {
			handleError(error);
		}
	};

	const addForum = async (forum) => {
		try {
			await supabase.from('topics').insert(forum);
			update(topics => [...topics, forum]);
			return forum
		} catch (error) {
			handleError(error);
		}
		get()
	};

	const deleteForum = async (forum) => {
		try {
			await supabase.from('topics').delete().eq('id', forum.id);
			update(forums => forum.filter(t => t.id !== forum.id));
			
		} catch (error) {
			handleError(error);
		}
	};

	const updateForum = async (forum) => {
		try {
			await supabase.from('topics').update(forum).eq('id', forum.id)
			update(forums => forum.map(t => t.id === forum.id ? forum : t));
			return forum
		} catch (error) {
			handleError(error);
		}
	};

	get();

	return {
		subscribe,
		get,
		fetchForum,
		addForum,
		deleteForum,
		updateForum
	};
};

export const forumStore = createForumStore();




