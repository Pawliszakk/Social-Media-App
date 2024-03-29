'use server';

import mongoose from 'mongoose';
import { User } from '../Models/user';
import { revalidatePath } from 'next/cache';
import { sendFollowRequest } from './sendFollowRequest';
import { FOLLOWING, NOTFOLLOWING } from '@/lib/constants/followingStatus';
import { getUserData } from '../utils/getUserData';

export async function followUser(userToFollowId: string) {
	const { session, user } = await getUserData('following');

	let userToFollow;
	try {
		userToFollow = await User.findOne({ _id: userToFollowId }).select(
			'followers private'
		);
	} catch (e: any) {
		throw new Error(e);
	}
	const isUserToFollowAlreadyFollowed = userToFollow.followers.find(
		(id: string) => id.toString() === user.id
	);
	if (userToFollow.private) {
		return await sendFollowRequest(user.id, userToFollowId);
	}
	if (!!isUserToFollowAlreadyFollowed) {
		throw new Error('User is already followed');
	}
	user.following.push(userToFollowId);
	userToFollow.followers.push(user.id);

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await user.save({ session: sess });
		await userToFollow.save({ session: sess });
		await sess.commitTransaction();
	} catch (e: any) {
		throw new Error(e);
	}

	revalidatePath('/', 'layout');
	return { ok: true, status: FOLLOWING };
}

export async function unFollowUser(userToUnfollowId: string) {
	const { session, user } = await getUserData('following');

	let userToUnfollow;
	try {
		userToUnfollow = await User.findOne({ _id: userToUnfollowId }).select(
			'followers'
		);
	} catch (e: any) {
		throw new Error(e);
	}
	const isUserToUnfollowAlreadyUnFollowed = userToUnfollow.followers.find(
		(id: string) => user.id
	);
	if (!isUserToUnfollowAlreadyUnFollowed) {
		return { ok: true, message: 'requested' };
	}
	user.following = user.following.filter(
		(id: string) => id.toString() !== userToUnfollowId
	);
	user.closeFriends = user.following.filter(
		(id: string) => id.toString() !== userToUnfollowId
	);
	userToUnfollow.followers = userToUnfollow.followers.filter(
		(id: string) => id.toString() !== user.id
	);

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await user.save({ session: sess });
		await userToUnfollow.save({ session: sess });
		await sess.commitTransaction();
	} catch (e: any) {
		throw new Error(e);
	}

	revalidatePath('/', 'layout');
	return { ok: true, status: NOTFOLLOWING };
}
