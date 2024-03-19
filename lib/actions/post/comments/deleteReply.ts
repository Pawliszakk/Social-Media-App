'use server';

import { revalidatePath } from 'next/cache';
import { CommentReply } from '../../Models/commentReply';
import { getUserData } from '../../utils/getUserData';
import mongoose from 'mongoose';
import { Comment } from '../../Models/comment';

export async function deleteReply(replyId: string, commentId: string) {
	const { session, user } = await getUserData('likedReplies');

	let reply;
	try {
		reply = await CommentReply.findOne({ _id: replyId }).select('author');
	} catch (e) {
		throw new Error('Failed to unlike a comment');
	}

	let comment;
	try {
		comment = await Comment.findOne({ _id: commentId }).select('replies');
	} catch (e) {
		throw new Error('Failed to unlike a comment');
	}

	if (!reply || !user) {
		throw new Error('Something went wrong, please try again later');
	}

	const isUserAuthor = reply.author.toString() === user.id.toString();
	if (!isUserAuthor) {
		throw new Error('Something went wrong, please try again later');
	}

	const updatedUserLikedReplies = user.likedReplies.filter(
		(id: string) => id.toString() !== replyId
	);

	const updatedCommentReplies = comment.replies.filter(
		(id: any) => id.toString() !== replyId
	);
	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await reply.deleteOne({ session: sess });
		user.likedReplies = updatedUserLikedReplies;
		comment.replies = updatedCommentReplies;
		await comment.save({ session: sess });
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (e: any) {
		throw new Error(e.message);
	}

	revalidatePath('/', 'layout');
}
