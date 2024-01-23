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

	let createdUser;
	try {
		createdUser = await newUser.save();
	} catch (e) {
		throw new Error('Failed to create user, please try again later');
	}
	if (createdUser) {
		return createdUser;
	}
}
