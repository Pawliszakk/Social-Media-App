import { User } from '../Models/user';

export const getLoggedUserProfile = async (userId: string) => {
	let user;
	try {
		user = await User.findOne({ _id: userId }).populate('posts');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	const filteredPosts = user.posts.filter((post: any) => !post.archived);

	user.posts = filteredPosts;
	return user;
};

export default getLoggedUserProfile;