'use server';

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
		throw new Error(
			'Invalid input data, please try again with correct credentials'
		);
	}

	await connectToDatabase();

	const user = await isUserInDatabase(email);

	if (user) {
		throw new Error(
			'User is already created for that account, please try logging in with another authentication provider or credentials'
		);
	}

	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (e) {
		throw new Error('Failed to create user, please try again later');
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
	} catch (e) {
		throw new Error('Failed to create user, please try again later');
	}

	if (createdUser) {
		return createdUser;
	}
}
