import { getServerSession } from 'next-auth';
import { User } from '../Models/user';

export const getLoggedUserProfile = async (userId: string) => {
	const session = await getServerSession();
	if (!session) {
		throw new Error('Authorization failed, please try again later');
	}

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
