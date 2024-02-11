'use server';

import { User } from '../Models/user';

export async function getSavedPosts(userId: string) {
	let user;
	try {
		user = await User.findOne({ _id: userId })
			.select('savedPosts name')
			.populate('savedPosts');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	const posts = user.savedPosts.reverse();
	const name = user.name;

	return { posts, name };
}
