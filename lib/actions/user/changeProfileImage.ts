'use server';

import { revalidatePath } from 'next/cache';
import { getSessionData } from '../utils/getSessionData';
import { User } from '../Models/user';
import { uploadImage } from '../utils/uploadImage';
import deleteImage from '../utils/deleteImage';

export async function changeProfileImage(formData: any) {
	const sessionData = await getSessionData();
	const userId = sessionData.user?.userId;

	const image = formData.get('image');

	if (!image) {
		throw new Error('Something went wrong, please try again later');
	}

	let user;
	try {
		user = await User.findOne({ _id: userId }).select('image imageType');
	} catch (e) {
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
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	revalidatePath('/', 'layout');
}
