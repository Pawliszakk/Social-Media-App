import { User } from '../Models/user';
var bcrypt = require('bcryptjs');

export async function loginUserByCredentials(email: string, password: string) {
	const isEmailValid = email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);

	const passwordIsValid =
		password.trim().length >= 8 && password.trim().length <= 20;

	if (!isEmailValid || !passwordIsValid) {
		return false;
	}

	let user;
	try {
		user = await User.findOne({ email });
	} catch (e) {
		console.log(e);
	}

	if (!user || user.length === 0) {
		return false;
	}

	if (user.provider !== 'credentials') {
		return false;
	}
	let isPasswordCorrect = false;
	try {
		isPasswordCorrect = await bcrypt.compare(password, user.password);
	} catch (e) {
		console.log(e);
	}

	return user;
}
