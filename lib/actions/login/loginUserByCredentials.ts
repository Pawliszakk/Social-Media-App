'use server';

import { connectToDatabase } from '../utils/connectToDatabase';
import { isUserInDatabase } from '../utils/isUserInDatabase';
import { validateInputs } from '../utils/validateInputs';
var bcrypt = require('bcryptjs');

export async function loginUserByCredentials(email: string, password: string) {
	const isInputsValid = validateInputs(email, password);
	if (!isInputsValid) {
		return false;
	}

	await connectToDatabase();

	const user = await isUserInDatabase(email);

	if (!user) {
		throw new Error(
			'No user was found for that email address, please create an account'
		);
	}

	if (user.provider !== 'credentials') {
		throw new Error('Try to login with another authentication provider');
	}

	let isPasswordCorrect = false;
	try {
		isPasswordCorrect = await bcrypt.compare(password, user.password);
	} catch (e) {
		throw new Error('Something went wrong, please try again later');
	}
	if (!isPasswordCorrect) {
		throw new Error(
			'Password is incorrect, please try again with correct credentials'
		);
	}

	if (isPasswordCorrect) {
		return user;
	}
}
