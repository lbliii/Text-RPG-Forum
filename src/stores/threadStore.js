import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

export const threads = writable([]);
export const thread = writable({});

export const loadThreads = async () => {
    const { data, error } = await supabase.from('threads').select();

    if (error) {
        return console.error(error);
    }
    threads.set(data);
}

export const loadThread = async (/** @type {any} */ id) => {
    let thread_id = id;
    const { data, error } = await supabase.from('threads').select().match({ thread_id });

    if (error) {
        return console.error(error);
    }

    thread.set(data[0]);
}

export const addThread = async (/** @type {any} */ title, /** @type {any} */ content, /** @type {any} */ user_id) => {
    const { data, error } = await supabase
        .from('threads')
        .insert([{ title, content, user_id }])
        .then(() => loadThreads());

    if (error) {
        return console.error(error);
    }
}

export const deleteThread = async (/** @type {any} */ id) => {
    const { error } = await supabase.from('threads').delete().match({ id });

    if (error) {
        return console.error(error);
    }

    threads.update((threads) => threads.filter((thread) => thread.id !== id));
}

loadThreads()