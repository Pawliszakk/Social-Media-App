'use server';

import { getServerSession } from 'next-auth';
import { User } from '../Models/user';
import { connectToDatabase } from '../utils/connectToDatabase';
import mongoose from 'mongoose';
import { Post } from '../Models/post';
import { getDate } from '../utils/getDate';

interface ImageFile {
	size: number;
	type: string;
	name: string;
	lastModified: number;
}

export async function createPost(description: string, image: ImageFile) {
	const session = await getServerSession();

	if (!image) {
		throw new Error('Please attach an image to your post');
	}

	await connectToDatabase();

	const email = session?.user?.email;

	let user;
	try {
		user = await User.findOne({ email });
	} catch (e) {
		throw new Error('Failed to create a post, please try again later');
	}

	if (!user) {
		throw new Error('Failed to create a post, please try again later');
	}

	const createdPost = new Post({
		author: user.id,
		commenting: true,
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
		throw new Error('Failed to create post, please try again later');
	}
}
