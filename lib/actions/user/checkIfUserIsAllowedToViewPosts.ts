'use server';

import { User } from '../Models/user';

export async function checkIfUserIsAllowedToViewPosts(
	userId: string,
	profileId: string
) {
	let profile;
	try {
		profile = await User.findOne({ _id: profileId }).select(
			'followers private'
		);
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}


	const isUserFollowingProfile = profile.followers.find((id: string) => userId);

	 const isUserAllowedToViewPosts = !profile.private || isUserFollowingProfile;

	return isUserAllowedToViewPosts;
}
