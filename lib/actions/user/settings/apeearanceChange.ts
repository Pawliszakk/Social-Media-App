'use server';

import { revalidatePath } from 'next/cache';
import { User } from '../../Models/user';

export async function appearanceChange(
	theme: 'dark' | 'light',
	userId: string
) {
	let user;
	try {
		user = await User.findOne({ _id: userId }).select('theme');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	try {
		user.theme = theme;
		await user.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	revalidatePath('/', 'layout');
}
