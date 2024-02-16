'use server';

import { User } from '../../Models/user';

export default async function getFollowedUsers(userId: string) {
	let user;
	try {
		user = await User.findOne({ _id: userId })
			.select('following closeFriends')
			.populate('following', 'image imageType name');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	return { closeFriends: user.closeFriends, following: user.following };
}
