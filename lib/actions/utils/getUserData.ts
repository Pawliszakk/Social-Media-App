'use server';

import { getServerSession } from 'next-auth';
import { User } from '../Models/user';
import { connectToDatabase } from './connectToDatabase';
import { permanentRedirect } from 'next/navigation';

export const getUserData = async (...args: string[]) => {
	const session = await getServerSession();
	if (!session) {
		return { session: null, user: null };
	}

	const email = session.user?.email;

	await connectToDatabase();

	const selectFields = args.join(' ');

	let user;
	try {
		user = await User.findOne({ email }).select(
			args.length === 0 ? 'null' : selectFields
		);
	} catch (e) {
		permanentRedirect('/');
	}

	if (!user) {
		throw new Error('Something went wrong, please try again later');
	}

	return { session, user };
};
