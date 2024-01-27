import { User } from '../Models/user';
import { connectToDatabase } from '../utils/connectToDatabase';

export async function getUserProfile(userId: string) {
	await connectToDatabase();

	let user;
	try {
		user = await User.findOne({ _id: userId }).select(
			'-email -password -_id  -provider -theme -__v -sex -savedPosts -closeFriends'
		);
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}

	if (!user) {
		return false;
	}
	return user;
}
