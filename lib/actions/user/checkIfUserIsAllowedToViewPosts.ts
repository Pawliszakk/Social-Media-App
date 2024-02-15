'use server';

import { User } from '../Models/user';

export async function checkIfUserIsAllowedToViewPosts(
	userId: string,
	profileId: string
) {
	let user;
	try {
		user = await User.findOne({ _id: userId }).select('blockedUsers');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	let profile: any;
	try {
		profile = await User.findOne({ _id: profileId }).select(
			'followers private blockedUsers'
		);
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	const isUserBlockingProfile = user.blockedUsers.find(
		(id: string) => id.toString() === profile.id
	);

	const isUserFollowingProfile = profile.followers.find((id: string) => userId);

	const isUserAllowedToViewPosts =
		!profile.private || isUserFollowingProfile || !isUserBlockingProfile;

	return {
		isUserAllowedToViewPosts,
		isUserBlockingProfile: !!isUserBlockingProfile,
	};
}
