'use server';

import xss from 'xss';
import { User } from '../../Models/user';
import { revalidatePath } from 'next/cache';
import { getUserData } from '../../utils/getUserData';

export async function editProfile(prevState: any, formData: any) {
	const userData = await getUserData();

	const name = formData.get('name');
	const website = formData.get('website');
	const bio = formData.get('bio');
	const sex = formData.get('sex');
	const showInSuggestions = formData.get('showInSuggestions');
	const sanitizedBio = xss(bio);

	const isNameValid = name.trim().length !== 0;
	const isBioValid = sanitizedBio.length < 150;
	const isSexValid = sex === 'man' || sex === 'woman' || sex === 'other';

	if (!isBioValid || !isSexValid || !isNameValid) {
		return { message: 'Invalid input data.' };
	}

	let user;
	try {
		user = await User.findOne({ _id: userData.user.id }).select('name bio sex');
	} catch (e) {
		return {
			message:
				'Something went wrong with editing your profile, please try again later.',
		};
	}

	let userWithTheSameNickName;
	try {
		userWithTheSameNickName = await User.findOne({ name });
	} catch (e) {
		return {
			message: 'Something went wrong, please try again later',
		};
	}
	if (userWithTheSameNickName && userWithTheSameNickName.id !== user.id) {
		return {
			message: 'This name is already in use, choose different nickname',
		};
	}

	try {
		user.name = name;
		user.website = website;
		user.bio = sanitizedBio;
		user.sex = sex;
		user.showInSuggestions = !!showInSuggestions;
		await user.save();
	} catch (e) {
		return {
			message:
				'Something went wrong with editing your profile, please try again later.',
		};
	}

	revalidatePath('/', 'layout');
	return { message: 'Your profile settings were updated.' };
}
