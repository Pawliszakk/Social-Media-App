'use server';

import { checkIfUserIsAllowedToViewPosts } from '../../user/checkIfUserIsAllowedToViewPosts';
import { getProfilePosts } from '../../user/getProfilePosts';
import { getUserData } from '../getUserData';

export async function getProfilePageData(profileId: string) {
	const { session, user } = await getUserData('showLikes');

	const isLoggedUserProfile = profileId === user.id;

	let isUserAllowedToViewPosts;
	let isUserBlockingProfile;
	if (!isLoggedUserProfile) {
		const res = await checkIfUserIsAllowedToViewPosts(user.id, profileId);

		isUserAllowedToViewPosts = res.isUserAllowedToViewPosts;

		isUserBlockingProfile = res.isUserBlockingProfile;
	}

	let profilePosts;
	let authorName;
	if (isUserAllowedToViewPosts || isLoggedUserProfile) {
		const { posts, name } = await getProfilePosts(profileId);
		profilePosts = posts;
		authorName = name;
	}

	return {
		isUserAllowedToViewPosts,
		isUserBlockingProfile,
		isLoggedUserProfile,
		profilePosts,
		authorName,
		user,
	};
}
