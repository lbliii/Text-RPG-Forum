import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

export const topics = writable([]);
export const topic = writable({});

export const loadTopics = async () => {
    const { data, error } = await supabase.from('topics').select();

    if (error) {
        return console.error(error);
    }
    topics.set(data);
}

export const loadTopic = async (/** @type {any} */ id) => {
    let topic_id = id;
    const { data, error } = await supabase.from('topics').select().match({ topic_id });

    if (error) {
        return console.error(error);
    }

    topic.set(data[0]);
}

export const addTopic = async (topic) => {
    console.log(topic)
    const { data, error } = await supabase
        .from('topics')
        .insert([{ ...topic }])
        .select();

    if (error) {
        return console.error(error);
    }
}

export const updateTopic = async (/** @type {any} */ id, /** @type {any} */ title, /** @type {any} */ content) => {
    const { data, error } = await supabase
        .from('topics')
        .update({ title, content })
        .match({ id });

    if (error) {
        return console.error(error);
    }
}

export const deleteTopic = async (/** @type {any} */ id) => {
    const { error } = await supabase.from('topics').delete().match({ id });

    if (error) {
        return console.error(error);
    }

    topics.update((topics) => topics.filter((topic) => topic.id !== id));
}

loadTopics()