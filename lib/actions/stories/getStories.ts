'use server';

import { Story } from '../Models/story';
import { getUserData } from '../utils/getUserData';

export async function getStories() {
	const { session, user } = await getUserData();

	let stories;
	try {
		stories = await Story.find({}).populate({
			path: 'author',
			select: 'name image imageType',
		});
	} catch (e) {
		console.log(e);
	}

	const storiesWithWatchedValue = stories?.map((story: any) => {
		const isStoryWatched = story.views.find(
			(id: string) => id.toString === user.id.toString()
		);

		return {
			id: story.id.toString(),
			author: story.author,
			image: story.image,
			date: story.date,
			likes: story.likes,
			isWatched: !!isStoryWatched,
		};
	});

	return storiesWithWatchedValue;
}
