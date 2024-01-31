'use server';

import { getServerSession } from 'next-auth';
import { permanentRedirect } from 'next/navigation';
import { User } from '../Models/user';
import { connectToDatabase } from './connectToDatabase';

export const getSessionData = async () => {
	const session = await getServerSession();

	if (!session) {
		permanentRedirect('/');
	}

	const name = session.user?.name;
	const email = session.user?.email;
	const image = session.user?.image;

	await connectToDatabase();

	let user;

	try {
		user = await User.findOne({ email });
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	return { session, name, email, image, userId: user.id, theme: user.theme };
};
