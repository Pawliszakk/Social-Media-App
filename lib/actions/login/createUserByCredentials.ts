import { User } from '../Models/user';
import { connectToDatabase } from '../utils/connectToDatabase';
import { getDate } from '../utils/getDate';
import { isUserInDatabase } from '../utils/isUserInDatabase';
import { validateInputs } from '../utils/validateInputs';
var bcrypt = require('bcryptjs');

export async function createUserByCredentials(
	name: string,
	email: string,
	password: string
) {
	const isInputsValid = validateInputs(email, password, name);

	if (!isInputsValid) {
		return false;
	}

	await connectToDatabase();

	const user = await isUserInDatabase(email);

	if (user) {
		return false;
	}

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
		provider: 'credentials',
		password: hashedPassword,
	});

	let createdUser;
	try {
		createdUser = await newUser.save();
	} catch (err) {
		console.log(err);
	}

	return createdUser;
}
