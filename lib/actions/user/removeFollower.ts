'use server';

import { revalidatePath } from 'next/cache';
import { getUserData } from '../utils/getUserData';
import { NOTFOLLOWING } from '@/lib/constants/followingStatus';
import { User } from '../Models/user';
import mongoose from 'mongoose';

export async function removeFollower(userToRemoveId: string) {
	const { session, user } = await getUserData('followers closeFriends');
	let userToRemove;
	try {
		userToRemove = await User.findOne({ _id: userToRemoveId }).select(
			'following'
		);
	} catch (e: any) {
		throw new Error(e);
	}
	user.closeFriends = user.closeFriends.filter(
		(id: string) => id.toString() !== userToRemoveId
	);
	user.followers = user.followers.filter(
		(id: string) => id.toString() !== userToRemoveId
	);
	userToRemove.following = userToRemove.following.filter(
		(id: string) => id.toString() !== user.id.toString()
	);

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await user.save({ session: sess });
		await userToRemove.save({ session: sess });
		await sess.commitTransaction();
	} catch (e: any) {
		throw new Error(e);
	}

	revalidatePath('/', 'layout');
	return { ok: true, status: NOTFOLLOWING };
}
