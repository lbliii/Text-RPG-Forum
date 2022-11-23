import { supabase } from '../../../supabase.js';

export async function load({ params }) {
	let id = params.slug;

	const { data, error } = await supabase.from('threads').select().match({ id });

	if (error) {
		return console.error(error || 'Error loading topic');
	}
	return data[0];
}
