'use server';

import { permanentRedirect } from 'next/navigation';
import { User } from '../Models/user';
import { getDate } from '../utils/getDate';
import { isUserInDatabase } from '../utils/isUserInDatabase';

export async function signUserByProvider(
	userData: { name: string; email: string; image: string },
	provider: string
) {
	const { name, email, image } = userData;

	const user = await isUserInDatabase(email);

	const isProviderCorrect = user.provider === provider;

	if (user && !isProviderCorrect) {
		throw new Error('Invalid provider for this account');
	}
	if (user && isProviderCorrect) {
		return user;
	}

	if (!user) {
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
			return permanentRedirect('/');
			// return createdUser;
		}
	}
}
