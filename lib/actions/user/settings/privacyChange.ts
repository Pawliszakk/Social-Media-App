'use server';

import { revalidatePath } from 'next/cache';
import { getUserData } from '../../utils/getUserData';

export async function privacyChange(privacy: boolean) {
	const { session, user } = await getUserData('private');

	try {
		user.private = privacy;
		await user.save();
	} catch (e) {
		return { message: 'Something went wrong, please try again later' };
	}

	revalidatePath('/', 'layout');
	return {
		message: `Successfully changed your profile privacy to ${
			user.private ? 'private' : 'public'
		}.`,
	};
}
