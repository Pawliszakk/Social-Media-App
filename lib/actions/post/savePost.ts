'use server';

import { revalidatePath } from 'next/cache';
import { getUserData } from '../utils/getUserData';

export async function savePost(postId: string) {
	const { session, user } = await getUserData('savedPosts');

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

	revalidatePath('/', 'layout');
}
