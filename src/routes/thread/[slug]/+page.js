import { supabase } from '../../../supabase.js';

export async function loadThread({ params }) {
	const id = params.slug;

	try {
		const { data } = await supabase.from('threads').select().match({ id });

		if (!data || !data.length) {
			throw new Error(`No data found for thread with id: ${id}`);
		}

		return data[0];
	} catch (error) {
		console.error(`Error loading thread with id: ${id}. Error: ${error}`);
		return {};
	}
}
