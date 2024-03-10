'use server';

import { User } from '../Models/user';
import { getUserData } from '../utils/getUserData';

export async function getSuggestedUsers(limit: number) {
	const { session, user } = await getUserData('following');
	let users;
	try {
		users = await User.find({ _id: { $nin: user.following } })
			.select('name image imageType')
			.limit(limit);
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	const usersWithoutLoggedUser = users.filter(
		(u: any) => u.id.toString() !== user.id.toString()
	);
	console.log(users);
	return { userId: user.id, users: usersWithoutLoggedUser };
}
