'use server';

import { User } from '../Models/user';
import { getUserData } from '../utils/getUserData';

export async function getSuggestedUsers(limit: number) {
	const { session, user } = await getUserData(
		'following sentFollowRequests',
		'sentFollowRequests'
	);

	let users;
	try {
		users = await User.find({
			_id: { $nin: user.following },
		})
			.select('name image imageType')
			.limit(limit);
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	const usersWithoutLoggedUser = users.filter(
		(u: any) => u.id.toString() !== user.id.toString()
	);

	const usersWithoutSentRequestsToFollow = usersWithoutLoggedUser
		.map((u: any) => {
			const isUserRequestedToFollow = user.sentFollowRequests.find(
				(el: any) => {
					return el.reciever.toString() === u.id;
				}
			);

			return isUserRequestedToFollow ? null : u;
		})
		.filter(Boolean);

	return { userId: user.id, users: usersWithoutSentRequestsToFollow };
}
