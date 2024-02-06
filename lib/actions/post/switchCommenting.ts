'use server';

import { revalidatePath } from 'next/cache';
import { Post } from '../Models/post';

export async function turnOnCommenting(postId: string, userId: string) {
	let post;
	try {
		post = await Post.findOne({ _id: postId });
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	if (!post) {
		throw new Error('Something went wrong, please try again later');
	}

	post.commenting = true;

	try {
		await post.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	revalidatePath(`/post/${postId}`);
	revalidatePath(`/profile/${userId}`);
	revalidatePath(`/`);
}
export async function turnOffCommenting(postId: string, userId: string) {
	let post;
	try {
		post = await Post.findOne({ _id: postId });
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	if (!post) {
		throw new Error('Something went wrong, please try again later');
	}

	post.commenting = false;

	try {
		await post.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	revalidatePath(`/post/${postId}`);
	revalidatePath(`/profile/${userId}`);
	revalidatePath(`/`);
}
