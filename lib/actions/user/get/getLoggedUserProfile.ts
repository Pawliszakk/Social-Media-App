import { User } from '../../Models/user';

const post = require('../../Models/post');

export const getLoggedUserProfile = async (userId: string) => {
	let user;
	try {
		user = await User.findOne({ _id: userId }).populate({
			path: 'posts',
			match: { archived: false },
			select: '_id',
		});
	} catch (e: any) {
		throw new Error(e);
	}
	const filteredPosts = user.posts.filter((post: any) => !post.archived);
	user.posts = filteredPosts.reverse();
	return user;
};

export default getLoggedUserProfile;
