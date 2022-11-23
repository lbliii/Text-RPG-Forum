import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

export const posts = writable([]);
export const post = writable({});

export const loadPosts = async () => {
    const { data, error } = await supabase.from('posts').select();

    if (error) {
        return console.error(error);
    }
    posts.set(data);
}

export const addPost = async (post) => {
    const { data, error } = await supabase
        .from('posts')
        .insert([{ ...post }])
        .then(() => loadPosts())


    if (error) {
        return console.error(error);
    }
}

export const deletePost = async (id) => {
    const { error } = await supabase.from('posts').delete().match({ id });

    if (error) {
        return console.error(error);
    }

    posts.update((posts) => posts.filter((post) => post.id !== id));
}

export const updatePost = async (post) => {
    // change the name of the post
    const { error } = await supabase.from('posts').update({ ...post }).match({ id });

    if (error) {
        return console.error(error);
    }
}