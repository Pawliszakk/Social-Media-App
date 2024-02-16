'use server';

import { revalidatePath } from 'next/cache';
import { User } from '../Models/user';

export default async function deleteCurrentAvatar(userId: string) {
	let user;
	try {
		user = await User.findOne({ _id: userId }).select('image imageType');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	user.image = '/assets/defaultUser.jpg';
	user.imageType = 'provider';

	try {
		await user.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	revalidatePath('/', 'layout');
}
