import { supabase } from '../../../supabase.js';

export async function load({ params }) {
	const id = params.slug;

	try {
		const { data } = await supabase.from('topics').select().match({ id });

		if (!data[0]) {
			throw new Error(`Topic with id '${id}' not found`);
		}

		return data[0];
	} catch (error) {
		console.error(`Error loading topic: ${error.message}`);
		return null;
	}
}
