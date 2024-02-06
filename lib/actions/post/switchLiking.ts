'use server';

import { revalidatePath } from 'next/cache';
import { Post } from '../Models/post';
import { permanentRedirect } from 'next/navigation';

export async function hideLiking(postId: string, userId: string) {
	let post;
	try {
		post = await Post.findOne({ _id: postId });
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	post.hideLikesCount = true;

	try {
		await post.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	revalidatePath(`/post/${postId}`);
	revalidatePath(`/profile/${userId}`);
	revalidatePath(`/`);
}
export async function showLiking(postId: string, userId: string) {
	let post;
	try {
		post = await Post.findOne({ _id: postId });
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	post.hideLikesCount = false;

	try {
		await post.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	revalidatePath(`/post/${postId}`);
	revalidatePath(`/profile/${userId}`);
	revalidatePath(`/`);
}
