'use server';

import { User } from '../../Models/user';

export default async function getBlockedUsers(userId: string) {
	let user;
	try {
		user = await User.findOne({ _id: userId })
			.select('blockedUsers')
			.populate('blockedUsers', 'image name imageType');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	return user.blockedUsers;
}
