'use server';

import { revalidatePath } from 'next/cache';
const { v4: uuidv4 } = require('uuid');
import { S3 } from '@aws-sdk/client-s3';
import { getSessionData } from '../utils/getSessionData';
import { User } from '../Models/user';
import { uploadImage } from '../utils/uploadImage';

const s3 = new S3({
	region: 'eu-central-1',
});

export async function changeProfileImage(prevState: any, formData: any) {
	const sessionData = await getSessionData();

	const userId = sessionData.user?.userId;

	const image = formData.get('image');

	if (!image) {
		return {
			message: 'Please attach an image to your post',
		};
	}

	let user;
	try {
		user = await User.findOne({ _id: userId }).select('image');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	try {
		const fileName = await uploadImage(image);
		user.image = fileName;
		user.imageType = 'user';
		await user.save();
	} catch (e) {
		return {
			message: 'Creating post failed, please try again later',
		};
	}

	revalidatePath('/', 'layout');
	return {
		message: 'Wszystko poszło w pyte',
	};
}
