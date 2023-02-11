import { supabase } from '../../../supabase.js';

export async function loadUser({ params }) {
	let userId = params.slug;

	const { data, error } = await supabase.from('users').select().match({ user_id: userId });

	if (error) {
		return console.error(`Error loading user: ${error}`);
	}

	if (data.length === 0) {
		return null;
	}

	return data[0];
}
