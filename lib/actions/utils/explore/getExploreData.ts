'use server';

import { getPosts } from '../../post/get/getPosts';
import { getUserData } from '../getUserData';

export async function getExploreData() {
	const { session, user } = await getUserData('blockedUsers');

	const posts = await getPosts(user.id, user.blockedUsers);

	return { posts, user };
}
