'use server';

import { Post } from '../Models/post';

export async function getLikesSnippet(postId: string) {
	let post;
	try {
		post = await Post.findOne({ _id: postId })
			.select('likes')
			.populate({ path: 'likes', select: 'name image imageType' });
	} catch (e: any) {
		throw new Error(e);
	}
	const cuttedLikesSnippet = post.likes.slice(0, 3);
	const likesSnippet = cuttedLikesSnippet.map((user: any) => ({
		id: user.id.toString(),
		name: user.name,
		image: user.image,
		imageType: user.imageType,
	}));
	return likesSnippet;
}
