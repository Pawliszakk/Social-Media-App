'use server';

import { User } from '../Models/user';
import { getUserData } from '../utils/getUserData';
import { checkIfUserIsAllowedToViewPosts } from './checkIfUserIsAllowedToViewPosts';

export async function getSnippetUserData(profileId: string) {
	const { session, user } = await getUserData();

	let profile;
	try {
		profile = await User.findOne({ _id: profileId })
			.select(
				'name image imageType followers following posts recievedFollowRequests private'
			)
			.populate('posts recievedFollowRequests');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	const filteredPosts = profile.posts.filter((post: any) => !post.archived);

	const latestPosts = filteredPosts.reverse().slice(0, 3);

	const postsWithIdAndImage = latestPosts.map((post: any) => ({
		id: post._id.toString(),
		image: post.image,
	}));

	const isRequestedToFollow = profile.recievedFollowRequests.find(
		(request: { requester: string }) => request.requester.toString() === user.id
	);

	const postsLength = filteredPosts.length;
	const followersLength = profile.followers.length;
	const followingLength = profile.following.length;

	const { isUserAllowedToViewPosts, isUserBlockingProfile } =
		await checkIfUserIsAllowedToViewPosts(profileId);
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
