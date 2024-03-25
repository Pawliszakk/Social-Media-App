'use server';

import { getUserData } from '../utils/getUserData';

export async function clearRecentSearches() {
	const { session, user } = await getUserData('recentSearches');

	try {
		user.recentSearches = [];
		user.save();
	} catch (e: any) {
		throw new Error(e);
	}
}
