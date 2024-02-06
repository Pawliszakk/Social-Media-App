'use server';

import { revalidatePath } from 'next/cache';
import { Post } from '../Models/post';
import { permanentRedirect } from 'next/navigation';

export async function archivePost(postId: string, userId: string) {
	let post;
	try {
		post = await Post.findOne({ _id: postId });
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	post.archived = true;

	try {
		await post.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	revalidatePath(`/post/${postId}`);
	revalidatePath(`/profile/${userId}`);
	revalidatePath(`/`);
	permanentRedirect(`/profile/${userId}`);
}
export async function showArchivedPost(postId: string, userId: string) {
	let post;
	try {
		post = await Post.findOne({ _id: postId });
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	post.archive = false;

	try {
		await post.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	revalidatePath(`/post/${postId}`);
	revalidatePath(`/profile/${userId}`);
	revalidatePath(`/`);
	permanentRedirect(`/profile/${userId}`);
}
