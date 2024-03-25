'use server';

import { getServerSession } from 'next-auth';
import { User } from '../Models/user';
import { connectToDatabase } from './connectToDatabase';
import { permanentRedirect } from 'next/navigation';
const followRequest = require('../Models/followRequest');

//MissingSchemaError: Schema hasn't been registered for model "followRequest".

export const getUserData = async (select?: string, populate?: string) => {
	const session = await getServerSession();
	if (!session) {
		return { session: null, user: null };
	}

	const email = session.user?.email;

	await connectToDatabase();

	const selectField = select?.trim().length === 0 || !select ? 'null' : select;
	const populateField = populate?.trim().length === 0 ? null : populate;

	let user;
	try {
		if (!!populateField) {
			user = await User.findOne({ email })
				.select(selectField)
				.populate(populateField);
		} else {
			user = await User.findOne({ email }).select(selectField);
		}
	} catch (e) {
		console.log(e);
		permanentRedirect('/');
	}

	if (!user) {
		throw new Error('Something went wrong, please try again later');
	}

	return { session, user };
};
