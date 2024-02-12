'use server';

import { getServerSession } from 'next-auth';
import { User } from '../Models/user';
import { connectToDatabase } from './connectToDatabase';

export const getSessionData = async () => {
	const session = await getServerSession();
	if (!session) {
		return { session: null, user: null };
	}

	const name = session.user?.name;
	const email = session.user?.email;
	const image = session.user?.image;

	await connectToDatabase();

	let user;

	try {
		user = await User.findOne({ email }).populate('sentFollowRequests');
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	if (!user) {
		throw new Error('Something went wrong, please try again later');
	}
	const userData = {
		name,
		email,
		image,
		imageType: user.imageType,
		userId: user.id,
		theme: user.theme,
		likedPosts: user.likedPosts,
		following: user.following,
		savedPosts: user.savedPosts,
		sentFollowRequests: user.sentFollowRequests,
		recievedFollowRequests: user.recievedFollowRequests,
	};

	return { session, user: userData };
};
