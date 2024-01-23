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

	if (!user || user.length === 0 || user.provider !== 'credentials') {
		return false;
	}

	let isPasswordCorrect = false;
	try {
		isPasswordCorrect = await bcrypt.compare(password, user.password);
	} catch (e) {
		console.log(e);
	}

	if (isPasswordCorrect) {
		return user;
	}
}
