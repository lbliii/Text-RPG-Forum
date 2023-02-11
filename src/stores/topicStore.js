import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

const handleError = (error) => {
	if (error) {
		console.error(error);
	}
};

export const topics = writable([]);
export const topic = writable({});

export const loadTopics = async () => {
	const { data, error } = await supabase.from('topics').select();
	handleError(error);
	topics.set(data);
};

export const loadTopic = async (id) => {
	const { data, error } = await supabase.from('topics').select().match({ topic_id: id });
	handleError(error);
	topic.set(data[0] || {});
};

export const addTopic = async (newTopic) => {
	const { error } = await supabase.from('topics').insert([newTopic]).select();
	handleError(error);
	loadTopics();
};

export const updateTopic = async (updatedTopic) => {
	const { error } = await supabase
		.from('topics')
		.update(updatedTopic)
		.match({ id: updatedTopic.id });
	handleError(error);
	loadTopics();
};

export const deleteTopic = async (deletedTopic) => {
	const { error } = await supabase.from('topics').delete().match({ id: deletedTopic.id });
	handleError(error);
	topics.update((topics) => topics.filter((t) => t.id !== deletedTopic.id));
};

loadTopics();
