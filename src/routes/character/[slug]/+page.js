import { supabase } from '../../../supabase.js';

/** @type {import('./$types').PageLoad} */

export async function load({ params }) {

    let id = params.slug;

    const { data, error } = await supabase.from('characters').select().match({id});

    if (error) {
        return console.error(error || 'Error loading character');
    }
    
    return data[0];
}
