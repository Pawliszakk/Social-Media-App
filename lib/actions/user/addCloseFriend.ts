'use server';

import { revalidatePath } from 'next/cache';
import { User } from '../Models/user';

export async function addCloseFriend(userId: string, profileId: string) {
	let user;

	try {
		user = await User.findOne({ _id: userId }).select('closeFriends');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

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

export async function removeCloseFriend(userId: string, profileId: string) {
	let user;
	try {
		user = await User.findOne({ _id: userId }).select('closeFriends');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

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
