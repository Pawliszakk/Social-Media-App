'use server';

import { revalidatePath } from 'next/cache';
import mongoose from 'mongoose';
import { Comment } from '../../Models/comment';
import { getUserData } from '../../utils/getUserData';

export async function likeComment(commentId: string) {
	const { session, user } = await getUserData('likedComments');

	let comment;
	try {
		comment = await Comment.findOne({ _id: commentId }).select('likes');
	} catch (e: any) {
		throw new Error(e);
	}

	if (!comment || !user) {
		throw new Error('Failed to like a comment');
	}

	const isUserAlreadyLiking = !!comment.likes.find(
		(id: string) => id.toString() === user.id.toString()
	);
	if (isUserAlreadyLiking) {
		return;
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		comment.likes.push(user.id.toString());
		user.likedComments.push(commentId);
		await comment.save({ session: sess });
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (e: any) {
		throw new Error(e);
	}
	revalidatePath('/', 'layout');
}

export async function unLikeComment(commentId: string) {
	const { session, user } = await getUserData('likedComments');

	let comment;
	try {
		comment = await Comment.findOne({ _id: commentId }).select('likes');
	} catch (e) {
		throw new Error('Failed to unlike a comment');
	}

	if (!comment || !user) {
		throw new Error('Something went wrong, please try again later');
	}

	const updatedCommentLikes = comment.likes.filter(
		(id: string) => id.toString() !== user.id.toString()
	);

	const updatedUserLikedComments = user.likedComments.filter(
		(id: string) => id.toString() !== commentId
	);

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		comment.likes = updatedCommentLikes;
		await comment.save({ session: sess });
		user.likedComments = updatedUserLikedComments;
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (e: any) {
		throw new Error(e);
	}

	revalidatePath('/', 'layout');
}
