'use server';

import { User } from '../Models/user';

export async function searchUsers(searchValue: string) {
	let users;

	try {
		users = await User.find({}).select('name image imageType');
	} catch (e) {
		throw new Error('Fetching users failed, please try again later');
	}

	return users;
}
