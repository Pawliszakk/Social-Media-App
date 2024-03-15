'use server';

import xss from 'xss';
import { Post } from '../../Models/post';
import { getUserData } from '../../utils/getUserData';
import { Comment } from '../../Models/comment';
import mongoose from 'mongoose';

export async function addComment(postId: string, comment: string) {
	const { session, user } = await getUserData();

	const isCommentEmpty = comment.trim().length === 0;
	const isCommentTooLarge = comment.length > 2200;
	if (isCommentEmpty || isCommentTooLarge) {
		throw new Error(
			'Invalid input data for comment, comment length should be between 1 or 2200 characters long.'
		);
	}

	const sanitizedComment = xss(comment);

	let post;
	try {
		post = await Post.findOne({ _id: postId }).select('comments');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	const createdComment = new Comment({
		author: user.id,
		content: sanitizedComment,
		date: new Date().getTime(),
	});

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await createdComment.save();
		post.comments.push(createdComment._id);
		await post.save({ session: sess });
		await sess.commitTransaction();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

}
