'use server';

import { getServerSession } from 'next-auth';
import { User } from '../Models/user';
import { connectToDatabase } from '../utils/connectToDatabase';
import mongoose from 'mongoose';
import { Post } from '../Models/post';
import { getDate } from '../utils/getDate';
const { v4: uuidv4 } = require('uuid');
import xss from 'xss';
import { redirect } from 'next/navigation';

interface ImageFile {
	size: number;
	type: string;
	name: string;
	lastModified: number;
}
// description: string,
// image: ImageFile,
// commenting: string,
// hideLikesCount: string
export async function createPost(prevState: any, formData: any) {
	const session = await getServerSession();

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
	if (!session) {
		return {
			message: 'Something went wrong, please try again later',
		};
	}

	await connectToDatabase();

	const email = session?.user?.email;

	let user;
	try {
		user = await User.findOne({ email });
	} catch (e) {
		return {
			message: 'Something went wrong, please try again later',
		};
	}

	if (!user) {
		return {
			message: 'Something went wrong, please try again later',
		};
	}
	const extension = image.name.split('.').pop();
	const imageId = uuidv4();
	const fileName = `${imageId}.${extension}`;
	// const bufferedImage = await image.arrayBuffer();

	//DODANIE DODAWANIA ZDJĘCIA DO S3 BUCKET
	//TWORZENIE I ZAPISYWANIE LINKU DO ZDJECIA ZA POMOCĄ UUID

	const createdPost = new Post({
		author: user.id,
		commenting: !commenting,
		hideLikesCount: !!hideLikesCount,
		description: sanitizedDescription,
		image: fileName,
		date: getDate(),
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

	redirect('/');
}
