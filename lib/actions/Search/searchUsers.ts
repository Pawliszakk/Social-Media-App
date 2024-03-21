'use server';

import { User } from '../Models/user';

export async function searchUsers(searchValue: string) {
	let users;

	try {
		users = await User.find({}).select('name image imageType');
	} catch (e) {
		throw new Error('Fetching users failed, please try again later');
	}
	const transformedUsers = users.map(
		(user: { id: string; name: string; image: string; imageType: string }) => ({
			id: user.id.toString(),
			name: user.name,
			image: user.image,
			imageType: user.imageType,
		})
	);

	return transformedUsers;
}
