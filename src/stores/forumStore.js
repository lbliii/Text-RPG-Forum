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

	const handleAddTopic = async (topic) => {
		try {
			store.update((topics) => [...topics, topic]);

			await supabase.from('topics').insert({
				user_id: topic.user_id,
				title: topic.title
			});
		} catch (error) {
			console.error(error);
		}
	};

	const addTopic = async (topic) => {
		try {
			store.update((topics) => [...topics, topic]);

			await supabase.from('topics').insert({
				user_id: topic.user_id,
				title: topic.title
			});
			console.log('addTopic', topic);
		} catch (error) {
			console.error(error);
		}
	};

const removeTopic = async (topic) => {
	try {
		store.update((topics) => topics.filter((t) => t.id !== topic.id));

		await supabase.from('topics').delete().eq('id', topic.id);
		console.log('removeTopic', topic.id);
	} catch (error) {
		console.error(error);
	}
};

	const updateTopic = async (topic) => {
		try {
			store.update((topics) => {
				const index = topics.findIndex((t) => t.id === topic.id);
				console.log(topics)
				return [...topics.slice(0, index), topic, ...topics.slice(index + 1)];
			});

			await supabase.from('topics').update(topic).eq('id', topic.id);
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
