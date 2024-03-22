'use server';

import { getUserData } from '../utils/getUserData';

export async function addSearchedUserToRecent(userId: string) {
	const { session, user } = await getUserData('recentSearches');

	const isUserInRecentAlready = user.recentSearches.find(
		(id: string) => id.toString() === userId
	);

	if (isUserInRecentAlready) {
		return;
	}

	try {
		user.recentSearches.push(userId);
		await user.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
}
