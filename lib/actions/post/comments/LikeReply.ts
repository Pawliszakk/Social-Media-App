'use server';

import { revalidatePath } from 'next/cache';
import mongoose from 'mongoose';
import { getUserData } from '../../utils/getUserData';
import { CommentReply } from '../../Models/commentReply';

export async function likeReply(replyId: string) {
	const { session, user } = await getUserData('likedReplies');

	let reply;
	try {
		reply = await CommentReply.findOne({ _id: replyId }).select('likes');
	} catch (e) {
		throw new Error('Failed to like a comment');
	}

	if (!reply || !user) {
		throw new Error('Failed to like a reply');
	}

	const isUserAlreadyLiking = !!reply.likes.find(
		(id: string) => id.toString() === user.id.toString()
	);
	if (isUserAlreadyLiking) {
		return;
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		reply.likes.push(user.id.toString());
		user.likedReplies.push(replyId);
		await reply.save({ session: sess });
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (e: any) {
		throw new Error(e.message);
	}

	revalidatePath('/', 'layout');
}

export async function unLikeReply(replyId: string) {
	const { session, user } = await getUserData('likedReplies');

	let reply;
	try {
		reply = await CommentReply.findOne({ _id: replyId }).select('likes');
	} catch (e) {
		throw new Error('Failed to unlike a reply');
	}

	if (!reply || !user) {
		throw new Error('Something went wrong, please try again later');
	}

	const updatedReplyLikes = reply.likes.filter(
		(id: string) => id.toString() !== user.id.toString()
	);

	const updatedUserLikedReplies = user.likedReplies.filter(
		(id: string) => id.toString() !== replyId
	);

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		reply.likes = updatedReplyLikes;
		await reply.save({ session: sess });
		user.likedReplies = updatedUserLikedReplies;
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (e: any) {
		throw new Error(e.message);
	}

	revalidatePath('/', 'layout');
}
