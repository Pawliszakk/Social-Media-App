'use server';

import { revalidatePath } from 'next/cache';
import { Post } from '../Models/post';

export async function editPost(postId: string, description: string) {
	if (description.length > 2200) {
		throw new Error(
			'Entered description is too long, please enter description with 2200 characters or less.'
		);
	}

	let post;
	try {
		post = await Post.findOne({ _id: postId }).select('description');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	try {
		post.description = description;
		post.save();
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	revalidatePath('/', 'layout');
}
