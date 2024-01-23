import { User } from '../Models/user';
import { getDate } from '../utils/getDate';
var bcrypt = require('bcryptjs');

export async function createUserByCredentials(
	name: string,
	email: string,
	password: string
) {
	const nameIsValid = name.trim().length >= 5 && name.trim().length <= 20;
	const emailIsValid = email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
	const passwordIsValid =
		password.trim().length >= 8 &&
		password.trim().length <= 20 &&
		/[A-Z]/.test(password) &&
		/[0-9]/.test(password) &&
		/[^A-Za-z0-9]/.test(password);

	if (!nameIsValid || !emailIsValid || !passwordIsValid) {
		return false;
	}

	let isUserInDatabase;
	try {
		isUserInDatabase = await User.findOne({ email });
	} catch (e) {
		console.log(e);
	}

	if (isUserInDatabase) {
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

	let user;
	try {
		user = await newUser.save();
	} catch (err) {
		console.log(err);
	}

	return user;
}
