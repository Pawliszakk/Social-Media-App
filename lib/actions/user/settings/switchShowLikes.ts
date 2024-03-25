'use server';

import { revalidatePath } from 'next/cache';
import { getUserData } from '../../utils/getUserData';

export async function switchShowLikes() {
	const { session, user } = await getUserData('showLikes');

	try {
		user.showLikes = !!!user.showLikes;
		await user.save();
	}  catch (e: any) {
		throw new Error(e);
	}
	revalidatePath('/', 'layout');

	return user.showLikes;
}
