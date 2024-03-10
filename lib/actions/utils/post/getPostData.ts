'use server';

import { permanentRedirect } from 'next/navigation';
import { getPostById } from '../../post/getPostById';
import { getUserData } from '../getUserData';

export async function getPostData(postId: string) {
	const { session, user } = await getUserData(
		'blockedUsers name image imageType likedPosts following savedPosts showLikes'
	);

	if (!session) {
		permanentRedirect('/auth/login');
	}

	const { post, isUserAllowedToView, isUserAuthor } = await getPostById(
		postId,
		user.id,
		user.blockedUsers
	);
	if (!isUserAllowedToView) {
		permanentRedirect(`/profile/${post.author.id}`);
	}

	const isUserLikingPost = user.likedPosts.find(
		(id: string) => id.toString() === post.id
	);
	const isUserFollowingAuthor = user.following.find(
		(id: string) => id.toString() === post.author.id
	);

	const isUserSavedPost = user.savedPosts.find(
		(id: string) => id.toString() === post.id
	);
	const author = {
		name: post.author.name,
		id: post.author._id.toString(),
		image: post.author.image,
		imageType: post.author.imageType,
	};
	return {
		user,
		post,
		isUserLikingPost,
		isUserAuthor,
		isUserFollowingAuthor,
		isUserSavedPost,
		author,
	};
}
