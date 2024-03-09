'use server';

import { User } from '../Models/user';
import { getUserData } from '../utils/getUserData';

export async function checkIfUserIsAllowedToViewPosts(
	userId: string,
	profileId: string
) {
	const { session, user } = await getUserData('blockedUsers');

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
	const isUserFollowingProfile = profile.followers.find(
		(id: string) => user.id
	);

	const isUserAllowedToViewPosts =
		!profile.private || isUserFollowingProfile || !!isUserBlockingProfile;

	return {
		isUserAllowedToViewPosts,
		isUserBlockingProfile: !!isUserBlockingProfile,
	};
}
