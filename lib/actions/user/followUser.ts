'use server';

import mongoose from 'mongoose';
import { User } from '../Models/user';
import { revalidatePath } from 'next/cache';
import { sendFollowRequest } from './sendFollowRequest';
import { FOLLOWING, NOTFOLLOWING } from '@/lib/constants/followingStatus';

export async function followUser(userId: string, userToFollowId: string) {
	let user;
	try {
		user = await User.findOne({ _id: userId }).select('following');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	let userToFollow;
	try {
		userToFollow = await User.findOne({ _id: userToFollowId }).select(
			'followers private'
		);
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	const isUserToFollowAlreadyFollowed = userToFollow.followers.find(
		(id: string) => userId
	);
	if (userToFollow.private) {
		return await sendFollowRequest(userId, userToFollowId);
	}
	if (!!isUserToFollowAlreadyFollowed) {
		throw new Error('User is already followed');
	}
	user.following.push(userToFollowId);
	userToFollow.followers.push(userId);

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await user.save({ session: sess });
		await userToFollow.save({ session: sess });
		await sess.commitTransaction();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	revalidatePath('/', 'layout');
	return { ok: true, status: FOLLOWING };
}

export async function unFollowUser(userId: string, userToUnfollowId: string) {
	let user;
	try {
		user = await User.findOne({ _id: userId }).select('following');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	let userToUnfollow;
	try {
		userToUnfollow = await User.findOne({ _id: userToUnfollowId }).select(
			'followers'
		);
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	const isUserToUnfollowAlreadyUnFollowed = userToUnfollow.followers.find(
		(id: string) => userId
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
		(id: string) => id.toString() !== userId
	);

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await user.save({ session: sess });
		await userToUnfollow.save({ session: sess });
		await sess.commitTransaction();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	revalidatePath('/', 'layout');
	return { ok: true, status: NOTFOLLOWING };
}
