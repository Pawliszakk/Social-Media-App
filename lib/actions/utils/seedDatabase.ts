'use server';

import { permanentRedirect } from 'next/navigation';
import { Answer } from '../Models/answer';
import { Comment } from '../Models/comment';
import { followRequest } from '../Models/followRequest';
import { Post } from '../Models/post';
import { User } from '../Models/user';

export default async function seedDatabase() {
	try {
		await Answer.deleteMany({});
		await Comment.deleteMany({});
		await followRequest.deleteMany({});
		await Post.deleteMany({});
		await User.deleteMany({});
	} catch (e) {
		throw new Error('Something went wrong');
	}
	permanentRedirect('/auth/login');
}
