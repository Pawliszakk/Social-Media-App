'use server';

import { revalidatePath } from 'next/cache';
import { unFollowUser } from './followUser';
import { getUserData } from '../utils/getUserData';

export async function blockUser(userToBlockId: string) {
	const { session, user } = await getUserData('blockedUsers');

	const isUserAlreadyBlocked = user.blockedUsers.find(
		(id: string) => id.toString() === userToBlockId
	);

	if (!!isUserAlreadyBlocked) {
		return;
	}
	try {
		user.blockedUsers.push(userToBlockId);
		await unFollowUser(userToBlockId);
		await user.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	revalidatePath('/', 'layout');
}
export async function unBlockUser(userToUnBlockId: string) {
	const { session, user } = await getUserData('blockedUsers');

	try {
		user.blockedUsers = user.blockedUsers.filter(
			(id: string) => id.toString() !== userToUnBlockId
		);
		await user.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	revalidatePath('/', 'layout');
}
