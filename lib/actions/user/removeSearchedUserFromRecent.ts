'use server';

import { getUserData } from '../utils/getUserData';

export async function removeSearchedUserFromRecent(userId: string) {
	const { session, user } = await getUserData('recentSearches');

	const isUserInRecentAlready = user.recentSearches.find(
		(id: string) => id.toString() === userId
	);

	if (!isUserInRecentAlready) {
		return;
	}
	const updatedUserRecentSearches = user.recentSearches.filter(
		(id: string) => id.toString() !== userId
	);
	try {
		user.recentSearches = updatedUserRecentSearches;
		await user.save();
	} catch (e: any) {
		throw new Error(e);
	}
}
