'use server';

import { User } from '../Models/user';

export async function getArchivedPosts(userId: string) {
	let user;
	try {
		user = await User.findOne({ _id: userId })
			.select('posts')
			.populate('posts');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	const archivedPosts = user.posts.filter((post: any) => post.archived);
	return { posts: archivedPosts.reverse() };
}
