import { permanentRedirect } from 'next/navigation';
import { Post } from '../Models/post';
import { getLikesSnippet } from './getLikesSnippet';
const comment = require('../Models/comment');

export async function getPostById(
	postId: string,
	userId: string,
	userBlockedProfiles: string[] | []
) {
	let post: any;
	try {
		post = await Post.findOne({ _id: postId }).populate({
			path: 'author',
			select: 'id name image private imageType blockedUsers',
		});
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	if (post.commenting) {
		try {
			await post.populate({
				path: 'comments',
				populate: { path: 'author', select: 'name image imageType' },
			});
		} catch (e) {
			throw new Error('Something went wrong, please try again later');
		}
	}
	const isProfileBlockedByUser = userBlockedProfiles.find(
		(id: string) => id.toString() === post.author.id
	);
	const isUserBlockedByAuthor = post.author.blockedUsers.find(
		(id: string) => id.toString() === userId
	);

	let likesSnippet = null;
	if (post.likes.length >= 3) {
		likesSnippet = await getLikesSnippet(postId);
	}
	if (isProfileBlockedByUser) {
		permanentRedirect(`/profile/${post.author.id}`);
	}

	if (isUserBlockedByAuthor) {
		permanentRedirect('/');
	}

	const isUserAuthor = post.author.id.toString() === userId;

	let isUserAllowedToView = !post.author.private && !post.archived;

	if (isUserAuthor) {
		isUserAllowedToView = true;
	}
	return { post, isUserAllowedToView, isUserAuthor, likesSnippet };
}
