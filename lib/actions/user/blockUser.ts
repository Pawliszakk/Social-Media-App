'use server';

import { revalidatePath } from 'next/cache';
import { User } from '../Models/user';

export async function blockUser(userId: string, userToBlockId: string) {
	let user;
	try {
		user = await User.findOne({ _id: userId }).select('blockedUsers');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	try {
		user.blockedUsers.push(userToBlockId);
		await user.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	revalidatePath('/', 'layout');
}
export async function unBlockUser(userId: string, userToUnBlockId: string) {
	let user;
	try {
		user = await User.findOne({ _id: userId }).select('blockedUsers');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	try {
		user.blockedUsers = user.blockedUsers.filter(
			(id: string) => !userToUnBlockId
		);
		await user.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	revalidatePath('/', 'layout');
}
