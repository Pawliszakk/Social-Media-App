'use server';

import { revalidatePath } from 'next/cache';
import { User } from '../../Models/user';
import { getSessionData } from '../../utils/getSessionData';

export async function switchShowLikes() {
	const session = await getSessionData();

	let user;
	try {
		user = await User.findOne({ _id: session?.user?.userId }).select(
			'showLikes'
		);
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
