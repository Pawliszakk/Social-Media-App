'use server';

import { getServerSession } from 'next-auth';
import { User } from '../Models/user';
import { connectToDatabase } from './connectToDatabase';
import { permanentRedirect } from 'next/navigation';

export const getSessionData = async () => {
	const session = await getServerSession();
	if (!session) {
		return { session: null, user: null };
	}

	const email = session.user?.email;

	await connectToDatabase();

	let user;
	try {
		user = await User.findOne({ email }).populate('sentFollowRequests');
	} catch (e) {
		permanentRedirect('/');
	}

	if (!user) {
		throw new Error('Something went wrong, please try again later');
	}

	const userData = {
		name: user.name,
		email,
		image: user.image,
		private: user.private,
		imageType: user.imageType,
		sex: user.sex,
		bio: user.bio,
		website: user.website,
		userId: user.id,
		theme: user.theme,
		showInSuggestions: user.showInSuggestions,
		likedPosts: user.likedPosts,
		following: user.following,
		savedPosts: user.savedPosts,
		blockedUsers: user.blockedUsers,
		closeFriends: user.closeFriends,
		sentFollowRequests: user.sentFollowRequests,
		recievedFollowRequests: user.recievedFollowRequests,
	};
	return { session, user: userData };
};
