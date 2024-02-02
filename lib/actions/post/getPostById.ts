import { Post } from '../Models/post';
import { connectToDatabase } from '../utils/connectToDatabase';

export async function getPostById(postId: string, userId: string) {
	await connectToDatabase();
	let post;
	try {
		post = await Post.findOne({ _id: postId }).populate(
			'author',
			'id name image private'
		);
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	const isUserAuthor = post.author.id.toString() === userId;

	let isUserAllowedToView = !post.author.private && !post.archived;

	if (isUserAuthor) {
		isUserAllowedToView = true;
	}
	return { post, isUserAllowedToView, isUserAuthor };
}
