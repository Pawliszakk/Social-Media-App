import { Post } from '../Models/post';
const Comment = require('@/lib/actions/Models/comment');
const CommentReply = require('@/lib/actions/Models/commentReply');
export async function getPosts(
	userId: string,
	userBlockedProfiles: [] | string[]
) {
	let posts;
	try {
		posts = await Post.find({
			archived: false,
		})
			.populate({
				path: 'author',
				select: 'id name image private imageType blockedUsers',
			})
			.populate({ path: 'comments', select: 'replies' });
	} catch (e: any) {
		throw new Error(e);
	}

	const filteredPosts = posts
		.filter((post) => {
			const isAuthorPrivate = post.author.private;
			const isAuthorBlockingUser = !post.author.blockedUsers.find(
				(id: string) => {
					return id.toString() === userId;
				}
			);
			const isUserBlockingAuthor = userBlockedProfiles.find((id: string) => {
				return id.toString() === post.author.id;
			});

			const shouldIncludePost =
				!isAuthorPrivate && isAuthorBlockingUser && !isUserBlockingAuthor;

			return shouldIncludePost ? post : null;
		})
		.reverse();

	const postsWithCommentsLength = filteredPosts.map((post) => {
		let comments = 0;

		post.comments.map((comment: any) => {
			comments += 1;
			comment.replies.map((reply: any) => {
				comments += 1;
			});
		});

		return {
			id: post.id,
			author: {
				id: post.author.id,
				name: post.author.name,
				image: post.author.image,
				imageType: post.author.imageType,
				private: post.author.private,
				blockedUsers: post.author.blockedUsers,
			},
			description: post.description,
			image: post.image,
			commenting: post.commenting,
			archived: post.archived,
			hideLikesCount: post.hideLikesCount,
			date: post.date,
			likes: post.likes,
			comments,
		};
	});
	return postsWithCommentsLength;
}
