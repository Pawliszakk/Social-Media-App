'use server';

import { revalidatePath } from 'next/cache';
import { User } from '../../Models/user';
import { getUserData } from '../../utils/getUserData';

export async function switchShowLikes() {
	const userData = await getUserData();

	let user;
	try {
		user = await User.findOne({ _id: userData.user.id }).select('showLikes');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	try {
		user.showLikes = !!!user.showLikes;
		await user.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	revalidatePath('/', 'layout');

	return user.showLikes;
}
