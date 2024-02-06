'use server';

import { revalidatePath } from 'next/cache';
import { Post } from '../Models/post';

export async function switchLiking(postId: string, userId: string) {
	let post;
	try {
		post = await Post.findOne({ _id: postId });
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	post.hideLikesCount = !post.hideLikesCount;

	try {
		await post.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	revalidatePath(`/post/${postId}`);
	revalidatePath(`/profile/${userId}`);
	revalidatePath(`/`);
}
