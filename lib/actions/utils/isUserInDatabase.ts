import { User } from '../Models/user';
import { connectToDatabase } from '../database/connectToDatabase';

export async function isUserInDatabase(email: string) {
	await connectToDatabase();

	let user;
	try {
		user = await User.find({ email });
	} catch (e) {
		throw new Error('Cannot log you in, please try again later');
	}
	if (!user || user.length === 0) {
		return false;
	}
	const provider = user[0].provider;

	return { provider };
}
