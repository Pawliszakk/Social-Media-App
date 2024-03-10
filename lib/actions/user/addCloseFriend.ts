'use server';

import { revalidatePath } from 'next/cache';
import { getUserData } from '../utils/getUserData';

export async function addCloseFriend(profileId: string) {
	const { session, user } = await getUserData('closeFriends');

	const isProfileAlreadyCloseFriend = user.closeFriends.find(
		(id: string) => id.toString() === profileId
	);

	if (isProfileAlreadyCloseFriend) {
		return;
	}

	try {
		user.closeFriends.push(profileId);
		await user.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	revalidatePath('/', 'layout');
}

export async function removeCloseFriend(profileId: string) {
	const { session, user } = await getUserData('closeFriends');

	const isProfileCloseFriend = user.closeFriends.find(
		(id: string) => id.toString() === profileId
	);

	if (!isProfileCloseFriend) {
		return;
	}

	const updatedCloseFrieds = user.closeFriends.filter(
		(id: string) => id.toString() !== profileId
	);

	try {
		user.closeFriends = updatedCloseFrieds;
		await user.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	revalidatePath('/', 'layout');
}
