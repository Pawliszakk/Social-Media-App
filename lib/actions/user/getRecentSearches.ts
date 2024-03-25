'use server';

import { getUserData } from '../utils/getUserData';

export async function getRecentSearches() {
	const { session, user } = await getUserData('recentSearches');

	try {
		await user.populate({
			path: 'recentSearches',
			select: 'name image imageType',
		});
	} catch (e: any) {
		throw new Error(e);
	}

	const transformedRecentSearches = user.recentSearches
		.map((user: any) => ({
			id: user.id.toString(),
			name: user.name,
			image: user.image,
			imageType: user.imageType,
		}))
		.reverse();

	return transformedRecentSearches;
}
