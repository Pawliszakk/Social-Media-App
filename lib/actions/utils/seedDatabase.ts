'use server';

import { permanentRedirect } from 'next/navigation';
import { Answer } from '../Models/answer';
import { Comment } from '../Models/comment';
import { followRequest } from '../Models/followRequest';
import { Post } from '../Models/post';
import { User } from '../Models/user';
import { createUserByCredentials } from '../login/createUserByCredentials';

export default async function seedDatabase() {
	try {
		await Answer.deleteMany({});
		await Comment.deleteMany({});
		await followRequest.deleteMany({});
		await Post.deleteMany({});
		await User.deleteMany({});

		await createUserByCredentials('test1', 'test1@example.com', 'Mocnehaslo1!');
		await createUserByCredentials('test2', 'test2@example.com', 'Mocnehaslo1!');
		await createUserByCredentials('test3', 'test3@example.com', 'Mocnehaslo1!');
		await createUserByCredentials('test4', 'test4@example.com', 'Mocnehaslo1!');
		await createUserByCredentials('test5', 'test5@example.com', 'Mocnehaslo1!');
	} catch (e) {
		throw new Error('Something went wrong');
	}
	permanentRedirect('/auth/login');
}
