'use server';

import { Comment } from '../../Models/comment';
const commentReply = require('../../Models/commentReply');

export async function getCommentReplies(commentId: string) {
	let comment;
	try {
		comment = await Comment.findOne({ _id: commentId })
			.select('replies')
			.populate({
				path: 'replies',
				populate: {
					path: 'author',
					model: 'User',
					select: 'name image imageType',
				},
			});
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	return comment.replies;
}
