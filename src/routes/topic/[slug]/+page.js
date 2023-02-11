import { supabase } from '../../../supabase.js';

export async function loadTopic({ params }) {
	const id = params.slug;

	try {
		const { data } = await supabase.from('topics').select().match({ id });
		const topic = data[0];

		if (!topic) {
			throw new Error(`Topic with id '${id}' not found`);
		}

		return topic;
	} catch (error) {
		console.error(`Error loading topic: ${error.message}`);
		return null;
	}
}
