import * as Yup from 'yup';

export const LoginSchema = Yup.object({
	email: Yup.string()
		.email('Invalid email address')
		.required('Please enter your email address'),
	password: Yup.string()
		.min(8, 'Your password is too short')
		.max(20, 'Your password is too long')
		.required('Please enter your password'),
});

export const SignupSchema = Yup.object({
	name: Yup.string()
		.min(5, 'Your name must have minimum 5 characters')
		.max(20, 'Your name must have maximum 20 characters')
		.required('Please enter your name'),
	email: Yup.string()
		.email('Invalid email address')
		.required('Please enter your email address'),
	password: Yup.string()
		.min(8, 'Your Password must have minimum 8 characters')
		.max(20, 'Your Password must have a maximum of 20 characters')
		.matches(
			/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).*$/,
			'Your Password must contain at least one uppercase letter, one number, and one special character'
		)
		.required('Please enter your password'),
});
