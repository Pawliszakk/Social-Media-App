'use server';

import mongoose from 'mongoose';
import { Post } from '../Models/post';
import { User } from '../Models/user';
import { revalidatePath } from 'next/cache';
import { permanentRedirect } from 'next/navigation';
import deleteImage from '../utils/deleteImage';

export async function deletePost(postId: string, userId: string) {
	let post;
	try {
		post = await Post.findOne({ _id: postId });
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	let user;
	try {
		user = await User.findOne({ _id: userId });
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	const isPostUsersPost = user.posts.find(
		(id: string) => id.toString() === postId
	);
	if (!post || !user || !!!isPostUsersPost) {
		throw new Error('Something went wrong, please try again later');
	}

	const updatedUserPosts = user.posts.filter(
		(id: string) => id.toString() !== postId
	);

	try {
		await deleteImage(post.image);
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await post.deleteOne();
		user.posts = updatedUserPosts;
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	revalidatePath('/', 'layout');
	permanentRedirect('/');
}
