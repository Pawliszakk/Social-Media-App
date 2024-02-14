'use server';

import { revalidatePath } from 'next/cache';
import { User } from '../../Models/user';

export async function privacyChange(privacy: boolean, userId: string) {
	let user;
	try {
		user = await User.findOne({ _id: userId }).select('private');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	try {
		user.private = privacy;
		await user.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	revalidatePath('/', 'layout');
}
