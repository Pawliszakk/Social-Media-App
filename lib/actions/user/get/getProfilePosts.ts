'use server';

import { User } from "../../Models/user";

const Comment = require('@/lib/actions/Models/comment');
const CommentReply = require('@/lib/actions/Models/commentReply');

export async function getProfilePosts(profileId: string) {
	let profile;
	try {
		profile = await User.findOne({ _id: profileId })
			.select('posts name')
			.populate({
				path: 'posts',
				match: { archived: false },
				populate: {
					path: 'comments',
				},
			});
	} catch (e: any) {
		throw new Error(e);
	}

	const profilePosts = profile.posts
		.map((post: any) => {
			let comments = 0;

			post.comments.map((comment: any) => {
				comments += 1;
				comment.replies.map((reply: any) => {
					comments += 1;
				});
			});
			return {
				id: post.id.toString(),
				author: post.author.toString(),
				description: post.description,
				image: post.image,
				commenting: post.commenting,
				archived: post.archived,
				hideLikesCount: post.hideLikesCount,
				date: post.date,
				likes: post.likes,
				comments,
			};
		})
		.reverse();
	return {
		posts: profilePosts,
		name: profile.name,
	};
}
