'use server';

import xss from 'xss';
import { Comment } from '../../Models/comment';
import { CommentReply } from '../../Models/commentReply';
import { getUserData } from '../../utils/getUserData';
import { revalidatePath } from 'next/cache';
import mongoose from 'mongoose';

export async function addReply(commentId: string, content: string) {
	const { session, user } = await getUserData();
	const isReplyEmpty = content.trim().length === 0;
	const isReplyTooLarge = content.length > 2200;
	if (isReplyEmpty || isReplyTooLarge) {
		throw new Error(
			'Invalid input data for Reply, Reply length should be between 1 or 2200 characters long.'
		);
	}
	const sanitizedReply = xss(content);

	let comment;
	try {
		comment = await Comment.findOne({ _id: commentId });
	} catch (e: any) {
		throw new Error(e);
	}

	const createdReply = new CommentReply({
		content: sanitizedReply,
		author: user.id,
		date: new Date().getTime(),
	});

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await createdReply.save();
		comment.replies.push(createdReply._id);
		await comment.save({ session: sess });
		await sess.commitTransaction();
	} catch (e: any) {
		throw new Error(e);
	}

	revalidatePath('/', 'layout');
}
