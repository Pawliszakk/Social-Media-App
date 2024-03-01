'use server';

import xss from 'xss';
import { User } from '../../Models/user';
import { getSessionData } from '../../utils/getSessionData';

export async function editProfile(prevState: any, formData: any) {
	const session = await getSessionData();
	const bio = formData.get('bio');
	const sex = formData.get('sex');
	const sanitizedBio = xss(bio);
	const isBioValid = sanitizedBio.length < 150;
	const isSexValid = sex === 'man' || sex === 'woman' || sex === 'other';

	if (!isBioValid || !isSexValid) {
		return { message: 'Invalid input data.' };
	}

	let user;
	try {
		user = await User.findOne({ _id: session.user?.userId }).select('bio sex');
	} catch (e) {
		return {
			message:
				'Something went wrong with editing your profile, please try again later.',
		};
	}

	user.bio = sanitizedBio;
	user.sex = sex;
	try {
		await user.save();
	} catch (e) {
		return {
			message:
				'Something went wrong with editing your profile, please try again later.',
		};
	}

	return { message: 'Your profile settings were updated.' };
}
