'use server';

import { User } from '../Models/user';

export async function getProfilePosts(profileId: string) {
	let profile;
	try {
		profile = await User.findOne({ _id: profileId })
			.select('posts name')
			.populate('posts');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	return {
		posts: profile.posts.reverse(),
		name: profile.name,
	};
}
