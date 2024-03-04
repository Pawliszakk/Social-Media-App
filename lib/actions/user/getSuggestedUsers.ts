'use server';

import { User } from '../Models/user';
import { getUserData } from '../utils/getUserData';

export async function getSuggestedUsers() {
	const { session, user } = await getUserData('following');
	let users;
	try {
		users = await User.find({ showInSuggestions: true })
			.select('name image imageType')
			.limit(5);
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	const usersWithoutLoggedUser = users.filter(
		(u: any) => u.id.toString() !== user.id.toString()
	);

	return usersWithoutLoggedUser;
}
