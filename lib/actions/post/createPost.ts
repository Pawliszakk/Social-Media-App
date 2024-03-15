'use server';

import mongoose from 'mongoose';
import { Post } from '../Models/post';
import xss from 'xss';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { uploadImage } from '../utils/uploadImage';
import { getUserData } from '../utils/getUserData';

export async function createPost(prevState: any, formData: any) {
	const { session, user } = await getUserData('posts');

	const description = formData.get('description');
	const image = formData.get('image');
	const commenting = formData.get('commenting');
	const hideLikesCount = formData.get('hideLikesCount');

	const sanitizedDescription = xss(description);

	if (!image) {
		return {
			message: 'Please attach an image to your post',
		};
	}
	if (sanitizedDescription.trim().length > 200) {
		return {
			message:
				'Please provide shorter description of your post. Maximum is 200 characters',
		};
	}

	let fileName;
	try {
		fileName = await uploadImage(image);
	} catch (e) {
		return {
			message: 'Creating post failed, please try again later',
		};
	}

	const createdPost = new Post({
		author: user.id,
		commenting: !commenting,
		hideLikesCount: !!hideLikesCount,
		description: sanitizedDescription,
		image: fileName,
		date: new Date().getTime(),
	});

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await createdPost.save({ session: sess });
		user.posts.push(createdPost._id);
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (e) {
		return {
			message: 'Something went wrong, please try again later',
		};
	}
	revalidatePath('/', 'layout');
	redirect('/');
}
