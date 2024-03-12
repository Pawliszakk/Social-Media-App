'use server';

import { User } from '../Models/user';

export async function getUserFollowing(profileId: string) {
	let profile;

	try {
		profile = await User.findOne({ _id: profileId })
			.select('following')
			.populate({ path: 'following', select: 'name image imageType' });
	} catch (e) {
		console.log(e);
		throw new Error('Something went wrong, please try again later');
	}

	return profile.following;
}
