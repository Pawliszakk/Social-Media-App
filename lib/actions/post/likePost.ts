'use server';

import { revalidatePath } from 'next/cache';
import { Post } from '../Models/post';
import { User } from '../Models/user';
import mongoose from 'mongoose';
import { getUserData } from '../utils/getUserData';

export async function likePost(postId: string) {
	const { session, user } = await getUserData('likedPosts');

	let post;
	try {
		post = await Post.findOne({ _id: postId });
	} catch (e) {
		throw new Error('Failed to like a post');
	}

	if (!post || !user) {
		throw new Error('Something went wrong, please try again later');
	}

	const isUserAlreadyLiking = post.likes.find(
		(id: string) => id.toString() === user.id.toString()
	);
	if (isUserAlreadyLiking) {
		return;
	}
	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		post.likes.push(user.id.toString());
		await post.save({ session: sess });
		user.likedPosts.push(postId);
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (e: any) {
		throw new Error(e.message);
	}

	revalidatePath('/', 'layout');
}

export async function unLikePost(postId: string) {
	const { session, user } = await getUserData('likedPosts');

	let post;
	try {
		post = await Post.findOne({ _id: postId });
	} catch (e) {
		throw new Error('Failed to like a post');
	}

	if (!post || !user) {
		throw new Error('Something went wrong, please try again later');
	}

	const updatedPostsLikes = post.likes.filter(
		(id: string) => id.toString() !== user.id.toString()
	);

	const updatedUserLikedPosts = user.likedPosts.filter(
		(id: string) => id.toString() !== postId
	);

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		post.likes = updatedPostsLikes;
		await post.save({ session: sess });
		user.likedPosts = updatedUserLikedPosts;
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (e: any) {
		throw new Error(e.message);
	}

	revalidatePath('/', 'layout');
}
