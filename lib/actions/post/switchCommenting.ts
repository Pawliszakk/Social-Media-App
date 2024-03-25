'use server';

import { revalidatePath } from 'next/cache';
import { Post } from '../Models/post';

export async function switchCommenting(postId: string) {
	let post;
	try {
		post = await Post.findOne({ _id: postId });
	} catch (e: any) {
		throw new Error(e);
	}

	if (!post) {
		throw new Error('Something went wrong, please try again later');
	}

	post.commenting = !post.commenting;

	try {
		await post.save();
	} catch (e: any) {
		throw new Error(e);
	}

	revalidatePath(`/`, 'layout');
}
