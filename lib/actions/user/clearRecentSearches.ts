'use server';

import { getUserData } from '../utils/getUserData';

export async function clearRecentSearches() {
	const { session, user } = await getUserData('recentSearches');

	try {
		user.recentSearches = [];
		user.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
}
