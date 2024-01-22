import { getDate } from '@/lib/utils/getDate';
import { User } from '../Models/user';

export async function createUser(
	user: { name: string; email: string; image: string; password?: string },
	provider: string
) {
	const { name, email, image, password } = user;

	// DODANIE WALIDACJI HASŁA

	const newUser = new User({
		email,
		name,
		image,
		date: getDate(),
		provider,
		...(password && { password }),
	});

	try {
		await newUser.save();
		return true;
	} catch (err) {
		throw new Error('Failed to create a user');
	}
	return false;
}
