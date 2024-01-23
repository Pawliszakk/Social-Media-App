import { User } from '../Models/user';
import { getDate } from '../utils/getDate';

export async function createUserByProvider(
	user: { name: string; email: string; image: string },
	provider: string
) {
	const { name, email, image } = user;

	const newUser = new User({
		email,
		name,
		image,
		date: getDate(),
		provider,
	});

	try {
		await newUser.save();
		return true;
	} catch (err) {
		console.log(err);
	}
	return false;
}
