export function validateInputs(email: string, password: string, name?: string) {
	const emailIsValid = email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);

	const passwordIsValid =
		password.trim().length >= 8 &&
		password.trim().length <= 20 &&
		/[A-Z]/.test(password) &&
		/[0-9]/.test(password) &&
		/[^A-Za-z0-9]/.test(password);

	if (name) {
		const nameIsValid = name.trim().length >= 5 && name.trim().length <= 20;
		return emailIsValid && passwordIsValid && nameIsValid;
	}

	return emailIsValid && passwordIsValid;
}
