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

	const fetchTopic = async (id) => {
		try {
			const { data } = await supabase.from('topics').select('*').match({ id });
			set(data[0]);
			return data[0]
		} catch (error) {
			handleError(error);
		}
	};

	const addTopic = async (topic) => {
		try {
			await supabase.from('topics').insert(topic);
			update(topics => [...topics, topic]);
		} catch (error) {
			handleError(error);
		}
		get()
	};

	const removeTopic = async (topic) => {
		try {
			await supabase.from('topics').delete().eq('id', topic.id);
			update(topics => topics.filter(t => t.id !== topic.id));
		} catch (error) {
			handleError(error);
		}
	};

	const updateTopic = async (topic) => {
		try {
			await supabase.from('topics').update(topic).eq('id', topic.id)
			update(topics => topics.map(t => t.id === topic.id ? topic : t));
		} catch (error) {
			handleError(error);
		}
	};

	get();

	return {
		subscribe,
		get,
		fetchTopic,
		addTopic,
		removeTopic,
		updateTopic
	};
};

export const forumStore = createForumStore();




