'use server';

import { revalidatePath } from 'next/cache';
import { getUserData } from '../utils/getUserData';

export default async function deleteCurrentAvatar() {
	const { session, user } = await getUserData('image imageType');

	user.image = '/assets/defaultUser.jpg';
	user.imageType = 'provider';

	try {
		await user.save();
	} catch (e: any) {
		throw new Error(e);
	}

	revalidatePath('/', 'layout');
}
