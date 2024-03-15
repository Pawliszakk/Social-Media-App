'use server';

import { revalidatePath } from 'next/cache';
import mongoose from 'mongoose';
import { Comment } from '../../Models/comment';
import { getUserData } from '../../utils/getUserData';

export async function likePost(commentId: string) {
	const { session, user } = await getUserData('likedPosts');

	let comment;
	try {
		comment = await Comment.findOne({ _id: commentId });
	} catch (e) {
		throw new Error('Failed to like a comment');
	}

	if (!comment || !user) {
		throw new Error('Something went wrong, please try again later');
	}

	const isUserAlreadyLiking = comment.likes.find(
		(id: string) => id.toString() === user.id.toString()
	);
	if (isUserAlreadyLiking) {
		return;
	}
	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		comment.likes.push(user.id.toString());
		await comment.save({ session: sess });
		user.likedComments.push(commentId);
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (e: any) {
		throw new Error(e.message);
	}

	revalidatePath('/', 'layout');
}

// export async function unLikePost(postId: string) {
// 	const { session, user } = await getUserData('likedPosts');

// 	let post;
// 	try {
// 		post = await Post.findOne({ _id: postId });
// 	} catch (e) {
// 		throw new Error('Failed to like a post');
// 	}

// 	if (!post || !user) {
// 		throw new Error('Something went wrong, please try again later');
// 	}

// 	const updatedPostsLikes = post.likes.filter(
// 		(id: string) => id.toString() !== user.id.toString()
// 	);

// 	const updatedUserLikedPosts = user.likedPosts.filter(
// 		(id: string) => id.toString() !== postId
// 	);

// 	try {
// 		const sess = await mongoose.startSession();
// 		sess.startTransaction();
// 		post.likes = updatedPostsLikes;
// 		await post.save({ session: sess });
// 		user.likedPosts = updatedUserLikedPosts;
// 		await user.save({ session: sess });
// 		await sess.commitTransaction();
// 	} catch (e: any) {
// 		throw new Error(e.message);
// 	}

// 	revalidatePath('/', 'layout');
// }
