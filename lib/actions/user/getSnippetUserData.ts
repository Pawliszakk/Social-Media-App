'use server';

import { User } from '../Models/user';
import { getUserData } from '../utils/getUserData';
import { checkIfUserIsAllowedToViewPosts } from './checkIfUserIsAllowedToViewPosts';

export async function getSnippetUserData(profileId: string, userId: string) {
	let profile;
	try {
		profile = await User.findOne({ _id: profileId })
			.select(
				'name image imageType followers following posts recievedFollowRequests private'
			)
			.populate('posts');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	const latestPosts = profile.posts.reverse().slice(0, 3);
	const postsWithIdAndImage = latestPosts.map((post: any) => ({
		id: post._id.toString(),
		image: post.image,
	}));
	const isRequestedToFollow = profile.recievedFollowRequests.find(
		(id: string) => id.toString() === userId
	);
	const postsLength = profile.posts.length;
	const followersLength = profile.followers.length;
	const followingLength = profile.following.length;

	const { isUserAllowedToViewPosts, isUserBlockingProfile } =
		await checkIfUserIsAllowedToViewPosts(userId, profileId);
	return {
		name: profile.name,
		image: profile.image,
		imageType: profile.imageType,
		private: profile.private,
		postsLength,
		followersLength,
		isRequestedToFollow: !!isRequestedToFollow,
		followingLength,
		latestPosts: postsWithIdAndImage,
		isUserAllowedToViewPosts: !!isUserAllowedToViewPosts,
	};
}
