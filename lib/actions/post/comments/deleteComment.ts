'use server';
import { revalidatePath } from 'next/cache';
import { getUserData } from '../../utils/getUserData';
import { Comment } from '../../Models/comment';
import mongoose from 'mongoose';

export async function deleteComment(commentId: string) {
	const { session, user } = await getUserData('likedComments');

	let comment;
	try {
		comment = await Comment.findOne({ _id: commentId }).select('author');
	} catch (e: any) {
		throw new Error(e);
	}

	if (!comment || !user) {
		throw new Error('Something went wrong, please try again later');
	}

	const isUserAuthor = comment.author.toString() === user.id.toString();
	if (!isUserAuthor) {
		throw new Error('Something went wrong, please try again later');
	}

	const updatedUserLikedComments = user.likedComments.filter(
		(id: string) => id.toString() !== commentId
	);
	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await comment.deleteOne({ session: sess });
		user.likedComments = updatedUserLikedComments;
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (e: any) {
		throw new Error(e);
	}

	revalidatePath('/', 'layout');
}
