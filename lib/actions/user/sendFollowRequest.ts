'use server';

import mongoose from 'mongoose';
import { followRequest } from '../Models/followRequest';
import { User } from '../Models/user';
import { getDate } from '../utils/getDate';
import { NOTFOLLOWING, REQUESTED } from '@/lib/constants/followingStatus';

export async function sendFollowRequest(
	requesterId: string,
	recieverId: string
) {
	let requester;
	try {
		requester = await User.findOne({ _id: requesterId }).select(
			'sentFollowRequests'
		);
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	let reciever;
	try {
		reciever = await User.findOne({ _id: recieverId }).select(
			'recievedFollowRequests'
		);
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	const newRequest = new followRequest({
		requester: requesterId,
		reciever: recieverId,
		date: getDate(),
	});

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		const createdRequest: any = await newRequest.save({ session: sess });
		requester.sentFollowRequests.push(createdRequest.id);
		reciever.recievedFollowRequests.push(createdRequest.id);
		await requester.save({ session: sess });
		await reciever.save({ session: sess });

		await sess.commitTransaction();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	return {
		ok: true,
		status: REQUESTED,
	};
}

export async function deleteFollowRequest(
	requesterId: string,
	recieverId: string
) {
	let requester;
	try {
		requester = await User.findOne({ _id: requesterId })
			.select('sentFollowRequests')
			.populate('sentFollowRequests');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	let reciever;
	try {
		reciever = await User.findOne({ _id: recieverId }).select(
			'recievedFollowRequests'
		);
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	const followRequest = requester.sentFollowRequests.find(
		(el: any) => el.reciever.toString() === recieverId
	);

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		requester.sentFollowRequests = requester.sentFollowRequests.filter(
			(req: any) => req.id.toString() !== followRequest.id
		);
		requester.recievedFollowRequests = reciever.recievedFollowRequests.filter(
			(req: any) => req.toString() !== followRequest.id
		);

		await followRequest.deleteOne();
		await requester.save({ session: sess });
		await reciever.save({ session: sess });

		await sess.commitTransaction();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	return { ok: true, status: NOTFOLLOWING };
}
