import { User } from '../Models/user';
import { connectToDatabase } from './connectToDatabase';

export async function isUserInDatabase(email: string) {
	await connectToDatabase();

	let user;
	try {
		user = await User.findOne({ email });
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	if (!user || user.length === 0) {
		return false;
	}

	return user;
}
