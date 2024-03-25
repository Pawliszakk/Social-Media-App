'use server';

import { revalidatePath } from 'next/cache';
import { uploadImage } from '../utils/uploadImage';
import deleteImage from '../utils/deleteImage';
import { getUserData } from '../utils/getUserData';

export async function changeProfileImage(formData: any) {
	const { session, user } = await getUserData('image imageType');

	const image = formData.get('image');

	if (!image) {
		throw new Error('Something went wrong, please try again later');
	}

	try {
		const fileName = await uploadImage(image);

		if (user.imageType !== 'provider') {
			await deleteImage(user.image);
		}

		user.image = fileName;
		user.imageType = 'user';
		await user.save();
	} catch (e: any) {
		throw new Error(e);
	}

	revalidatePath('/', 'layout');
}
