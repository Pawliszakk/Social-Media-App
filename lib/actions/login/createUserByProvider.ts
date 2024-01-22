import { getDate } from '@/lib/utils/getDate';
import { User } from '../Models/user';

export async function createUserByProvider(
	user: { name: string; email: string; image: string },
	provider: string
) {
	const { name, email, image } = user;

	// DODANIE WALIDACJI HASŁA

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
		throw new Error('Failed to create a user');
	}
	return false;
}
