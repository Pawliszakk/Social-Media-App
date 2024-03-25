'use server';

import { revalidatePath } from 'next/cache';
import { Post } from '../Models/post';

export async function switchLiking(postId: string) {
	let post;
	try {
		post = await Post.findOne({ _id: postId });
	} catch (e: any) {
		throw new Error(e);
	}

	post.hideLikesCount = !post.hideLikesCount;

	try {
		await post.save();
	} catch (e: any) {
		throw new Error(e);
	}

	revalidatePath('/', 'layout');
}
