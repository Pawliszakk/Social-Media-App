'use server';

import { User } from '../Models/user';
import { getUserData } from '../utils/getUserData';

export async function getTopUsers() {
	const { session, user } = await getUserData('following');
	let users;
	try {
		users = await User.find({ _id: { $nin: user.following } })
			.select('name image imageType followers')
			.limit(50);
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	const usersWithoutLoggedUser = users.filter(
		(u: any) => u.id.toString() !== user.id.toString()
	);

	const modifiedUsers = usersWithoutLoggedUser.map((user) => {
		return {
			id: user.id,
			name: user.name,
			image: user.image,
			imageType: user.imageType,
			followers: user.followers.length,
		};
	});

	const sortedUsers = modifiedUsers.sort((a, b) => b.followers - a.followers);
	return { userId: user.id, users: sortedUsers };
}
