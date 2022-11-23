import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';
import { post } from './postStore.js';

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

// NOTES: see threadForm for best working example.
export const addThread = async (thread) => {
    const { data, error } = await supabase
        .from('threads')
        .insert([{ ...thread }])
        .select()
        
    if (error) {
        return console.error(error);
    }

   return data;
}

 
export const updateThread = async (thread) => {
    const { data, error } = await supabase
        .from('threads')
        .update({ ...thread })
        .match({ thread_id: thread.thread_id })
        .then(() => loadThreads());

    if (error) {
        return console.error(error);
    }
}

export const deleteThread = async (thread) => {
    let id = thread.id;
    const { error } = await supabase.from('threads').delete().match({ id });

    if (error) {
        return console.error(error);
    }

    threads.update((threads) => threads.filter((thread) => thread.id !== id));
}

loadThreads()