import {userStore} from '../../../stores/userStore.js';

export async function load({ params }) {
	let user_id = params.slug;

	let user = await userStore.fetchOtherUser(user_id);

	return user;
}




