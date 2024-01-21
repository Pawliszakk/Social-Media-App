'use server';
import { User } from './Models/user';
import { connectToDatabase } from './Database/connectToDatabase';

export async function test() {
	const db = await connectToDatabase();

	const createdUser = new User({
		name: 'Petr',
	});

	try {
		await createdUser.save();
	} catch (e) {
		console.log(e);
	}

	console.log('server action');
}
