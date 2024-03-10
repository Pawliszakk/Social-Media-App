'use server';

import { revalidatePath } from 'next/cache';
import { Post } from '../Models/post';
import { permanentRedirect } from 'next/navigation';

export async function archivePost(postId: string) {
	let post;
	try {
		post = await Post.findOne({ _id: postId });
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	try {
		post.archived = true;
		await post.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	revalidatePath('/', 'layout');
	permanentRedirect(`/profile/${post.author.toString()}`);
}
export async function showArchivedPost(postId: string) {
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

	revalidatePath('/', 'layout');
	permanentRedirect(`/profile/${post.author.toString()}`);
}
