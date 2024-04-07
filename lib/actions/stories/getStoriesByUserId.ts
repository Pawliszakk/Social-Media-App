'use server';

import { Story } from '../Models/story';
import { getUserData } from '../utils/getUserData';

export async function getStoriesByProfileId(profileId: string) {
	const { session, user } = await getUserData();

	let stories;
	try {
		stories = await Story.find({ author: profileId });
	} catch (e) {
		console.log(e);
	}
	return stories;
}
