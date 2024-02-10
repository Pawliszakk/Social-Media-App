import { User } from '../Models/user';
import { connectToDatabase } from '../utils/connectToDatabase';

export async function getProfile(userId: string) {
	let user;
	try {
		user = await User.findOne({ _id: userId })
			.populate('posts')
			.select(
				'-email -password -provider -theme -__v -sex -savedPosts -closeFriends -likedPosts'
			);
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	const filteredPosts = user.posts.filter((post: any) => !post.archived);

	user.posts = filteredPosts;

	if (!user) {
		return false;
	}
	return user;
}
