'use server';

import { User } from '../Models/user';

export async function getSnippetUserData(profileId: string | undefined) {
	let user;
	try {
		user = await User.findOne({ _id: profileId })
			.select('name image imageType followers following posts')
			.populate('posts');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	const latestPosts = user.posts.reverse().slice(0, 3);
	const postsWithIdAndImage = latestPosts.map((post: any) => ({
		id: post._id.toString(),
		image: post.image,
	}));
	const postsLength = user.posts.length;
	const followersLength = user.followers.length;
	const followingLength = user.following.length;

	return {
		name: user.name,
		image: user.image,
		imageType: user.imageType,
		postsLength,
		followersLength,
		followingLength,
		latestPosts: postsWithIdAndImage,
	};
}
