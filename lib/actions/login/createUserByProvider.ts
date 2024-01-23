import { User } from '../Models/user';
import { getDate } from '../utils/getDate';

export async function createUserByProvider(
	user: { name: string; email: string; image: string },
	provider: string
) {
	const { name, email, image } = user;

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
	// const userData: any = {
	// 	userId: user.id,
	// 	email: user.email,
	// 	name: user.name,
	// 	image: user.image,
	// 	sex: user.sex,
	// 	private: user.private,
	// 	date: user.date,
	// 	theme: user.theme,
	// 	provider: user.provider,
	// };

	// cookies().set('user', userData.userId);

	//	USTAWIANIE DANYCH W COOKIESACH

	if (createdUser) {
		return createdUser;
	}
}
