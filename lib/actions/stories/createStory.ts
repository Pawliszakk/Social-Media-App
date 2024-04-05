'use server';

import mongoose from 'mongoose';
import { Story } from '../Models/story';
import { getUserData } from '../utils/getUserData';
import { uploadImage } from '../utils/uploadImage';
import { revalidatePath } from 'next/cache';
import { permanentRedirect } from 'next/navigation';

export async function createStory(prevState: any, formData: any) {
	const { session, user } = await getUserData('stories');

	const image = formData.get('image');

	if (!image) {
		return { message: 'Please add valid image' };
	}

	const imageName = await uploadImage(image);

	const createdStory = new Story({
		author: user.id,
		image: imageName,
		date: new Date().getTime(),
	});

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await createdStory.save({ session: sess });
		user.stories.push(createdStory._id);
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (e) {
		return {
			message: 'Something went wrong, please try again later',
		};
	}

	revalidatePath('/', 'layout');
	permanentRedirect('/');
}
