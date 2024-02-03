'use server';

import { revalidatePath } from 'next/cache';
import { User } from '../Models/user';

export async function savePost(postId: string, userId: string) {
	let user;
	try {
		user = await User.findOne({ _id: userId });
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	const isPostAlreadySaved = user.savedPosts.find(
		(id: string) => id.toString() === postId
	);

	if (isPostAlreadySaved) {
		try {
			const updatedSavedPosts = user.savedPosts.filter(
				(id: string) => id.toString() !== postId
			);

			user.savedPosts = updatedSavedPosts;

			await user.save();
		} catch (e) {
			throw new Error('Something went wrong, please try again later');
		}
	} else {
		try {
			user.savedPosts.push(postId);
			await user.save();
		} catch (e) {
			throw new Error('Something went wrong, please try again later');
		}
	}

	revalidatePath(`/post/${postId}`);
}
