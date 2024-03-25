import { User } from '../../Models/user';

export async function getProfile(profileId: string) {
	let user;
	try {
		user = await User.findOne({ _id: profileId })
			.populate({
				path: 'posts',
				match: { archived: false },
			})
			.select(
				'-email -password -provider -theme -__v -sex -savedPosts -closeFriends -likedPosts'
			);
	} catch (e: any) {
		throw new Error(e);
	}
	const filteredPosts = user.posts.filter((post: any) => !post.archived);

	user.posts = filteredPosts.reverse();

	if (!user) {
		return false;
	}
	return user;
}
