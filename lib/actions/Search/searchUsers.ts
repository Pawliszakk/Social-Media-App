'use server';

import { User } from '../Models/user';

export async function searchUsers(searchValue: string) {
	let users;

	try {
		users = await User.find({}).select('name image imageType');
	} catch (e) {
		throw new Error('Fetching users failed, please try again later');
	}

	const filteredUsers = users.filter((user: { name: string }) =>
		user.name.toLowerCase().includes(searchValue.toLowerCase())
	);

	const transformedUsers = filteredUsers.map((user) => ({
		id: user.id.toString(),
		name: user.name,
		image: user.image,
		imageType: user.imageType,
	}));

	return transformedUsers;
}
