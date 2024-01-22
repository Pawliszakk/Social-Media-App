import { User } from '../Models/user';
import { getDate } from '../utils/getDate';
var bcrypt = require('bcryptjs');

export async function createUserByCredentials(
	user: { name: string; email: string; image: string; password: string },
	provider: string
) {
	const { name, email, password } = user;

	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (e) {
		console.log(e);
	}
	const newUser = new User({
		email,
		name,
		date: getDate(),
		provider,
		password: hashedPassword,
	});

	try {
		await newUser.save();
		return true;
	} catch (err) {
		console.log(err);
	}
	return true;
}
