import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

const createForumStore = () => {
	const store = writable([]);

	const fetchTopics = async () => {
		try {
			const { data } = await supabase.from('topics').select('*');
			store.set(data);
		} catch (error) {
			console.error(error);
		}
	};

	const addTopic = async (topic) => {
		try {
			await supabase.from('topics').insert(topic);

			store.update(topics => [...topics, topic]);
			console.log('addTopic', topic);
		} catch (error) {
			console.error(error);
		}

		fetchTopics()
	};

	const removeTopic = async (topic) => {
		try {
			await supabase.from('topics').delete().eq('id', topic.id);
			store.update(topics => topics.filter(t => t.id !== topic.id));
			console.log('removeTopic', topic.id);
		} catch (error) {
			console.error(error);
		}
	};

	const updateTopic = async (topic) => {
		try {
			await supabase.from('topics').update(topic).eq('id', topic.id);
			store.update(topics => topics.map(t => t.id === topic.id ? topic : t));
			console.log('updateTopic', topic);
		} catch (error) {
			console.error(error);
		}
	};

	fetchTopics();

	return {
		subscribe: store.subscribe,
		addTopic,
		removeTopic,
		updateTopic
	};
};

export const forumStore = createForumStore();




