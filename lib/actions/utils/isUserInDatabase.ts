import { User } from '../Models/user';
import { connectToDatabase } from './connectToDatabase';

export async function isUserInDatabase(email: string) {
	await connectToDatabase();

	let user;
	try {
		user = await User.findOne({ email });
	} catch (e: any) {
		throw new Error(e);
	}
	if (!user) {
		return false;
	}

	return user;
}
