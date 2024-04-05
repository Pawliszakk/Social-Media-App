'use server';

import { Story } from '../Models/story';
import { getUserData } from '../utils/getUserData';

export async function getUserStories() {
	const { session, user } = await getUserData();
	let stories;
	try {
		stories = await Story.find({ author: user.id });
	} catch (e) {
		console.log(e);
	}
	console.log(stories);
	return stories;
}
