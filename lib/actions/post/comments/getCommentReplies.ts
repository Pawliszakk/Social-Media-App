'use server';

import { Comment } from '../../Models/comment';
import { getUserData } from '../../utils/getUserData';
const commentReply = require('../../Models/commentReply');

export async function getCommentReplies(commentId: string) {
	const { session, user } = await getUserData('likedReplies');
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

	const replies = comment.replies.map((reply: any) => {
		const isUserLikingReply = !!user.likedReplies.find(
			(id: string) => id.toString() === reply.id.toString()
		);
		return {
			id: reply._id.toString(),
			author: {
				id: reply.author._id.toString(),
				name: reply.author.name,
				image: reply.author.image,
				imageType: reply.author.imageType,
			},
			content: reply.content,
			date: reply.date,
			likes: reply.likes,
			isUserLikingReply,
		};
	});

	return replies;
}
