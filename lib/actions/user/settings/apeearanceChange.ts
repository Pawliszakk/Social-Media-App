'use server';

import { revalidatePath } from 'next/cache';
import { getUserData } from '../../utils/getUserData';

export async function appearanceChange(theme: 'dark' | 'light') {
	const { session, user } = await getUserData('theme');

	try {
		user.theme = theme;
		await user.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	revalidatePath('/', 'layout');
}
