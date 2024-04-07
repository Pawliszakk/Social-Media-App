'use server';

import { Story } from '../Models/story';
import { getUserData } from '../utils/getUserData';

export async function viewStory(storyId: string) {
	const { session, user } = await getUserData();

	let story;
	try {
		story = await Story.findOne({ _id: storyId });
	} catch (e) {
		console.log(e);
	}
	console.log(story);
}
