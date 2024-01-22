'use client';

import { useFormik } from 'formik';
import { LoginSchema } from '@/lib/validation/validation';
import Input from './Input';
import SubmitButton from '../Buttons/SubmitButton';
import { signIn } from 'next-auth/react';

const LoginForm = () => {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: LoginSchema,
		onSubmit: (values) => {
			signIn('credentials', {
				...values,
			});
		},
	});

	const { touched, errors, handleSubmit, getFieldProps } = formik;

	return (
		<form onSubmit={handleSubmit}>
			<Input
				label="E-mail"
				name="email"
				type="email"
				placeholder="Enter your email"
				error={errors.email}
				touched={touched.email}
				field={getFieldProps('email')}
			/>
			<Input
				label="Password"
				name="password"
				type="password"
				placeholder="Please enter your password..."
				error={errors.password}
				touched={touched.password}
				field={getFieldProps('password')}
			/>
			<SubmitButton>Login with credentials</SubmitButton>
		</form>
	);
};

export default LoginForm;
