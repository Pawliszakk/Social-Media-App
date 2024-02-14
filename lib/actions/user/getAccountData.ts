'use server';

import { User } from '../Models/user';

export async function getAccountData(userId: string) {
	let user;

	try {
		user = await User.findOne({ _id: userId }).select('date image name imageType');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	return user;
}
