'use server';

import { Story } from '../Models/story';
import { getUserData } from '../utils/getUserData';

export async function getStoriesByProfileId(profileId: string) {
	const { session, user } = await getUserData();

	let stories;
	try {
		stories = await Story.find({ author: profileId }).populate(
			'author',
			'name image imageType'
		);
	} catch (e) {
		console.log(e);
	}

	const transformedStories = stories?.map((story: any) => {
		return {
			id: story.id.toString(),
			author: {
				id: story.author.id.toString(),
				name: story.author.name,
				image: story.author.image,
				imageType: story.author.imageType,
			},
			image: story.image,
			date: story.date,
			likes: story.likes,
			views: story.views,
		};
	});

	if (transformedStories) {
		return transformedStories[0];
	}
}
