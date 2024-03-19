'use server';

import { permanentRedirect } from 'next/navigation';
import { Comment } from '../Models/comment';
import { followRequest } from '../Models/followRequest';
import { Post } from '../Models/post';
import { User } from '../Models/user';
import { createUserByCredentials } from '../login/createUserByCredentials';
import { CommentReply } from '../Models/commentReply';

export default async function seedDatabase() {
	try {
		await CommentReply.deleteMany({});
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
		throw new Error('Something went wrong, please try again later');
	}
	permanentRedirect('/auth/login');
}
