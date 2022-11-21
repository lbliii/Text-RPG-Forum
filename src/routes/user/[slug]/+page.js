import { supabase } from '../../../supabase.js';


export async function load({ params }) {
	let user_id = params.slug;

	const { data, error } = await supabase.from('users').select().match({ user_id });

	if (error) {
		return console.error(error || 'Error loading character');
	}
	return data[0];
}
