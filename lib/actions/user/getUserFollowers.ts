'use server';

import { User } from '../Models/user';

export async function getUserFollowers(profileId: string) {

	//DODAĆ CHECK CZY AKTUALNY USER OBSERWUJE TEGO USERA
	let profile;

	try {
		profile = await User.findOne({ _id: profileId })
			.select('followers')
			.populate({ path: 'followers', select: 'name image imageType' });
	} catch (e) {
		console.log(e);
		throw new Error('Something went wrong, please try again later');
	}

	return profile.followers;
}
