import { User } from '../Models/user';
import { connectToDatabase } from '../utils/connectToDatabase';

export async function getProfile(userId: string) {
	await connectToDatabase();

	let user;
	try {
		user = await User.findOne({ _id: userId })
			.select(
				'-email -password -provider -theme -__v -sex -savedPosts -closeFriends -likedPosts'
			)
			.populate('posts');
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
