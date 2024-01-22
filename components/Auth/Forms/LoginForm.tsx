'use client';

import { useFormik } from 'formik';
import { LoginSchema } from '@/lib/validation/validation';
import Input from './Input';

const LoginForm = () => {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: LoginSchema,
		onSubmit: (values) => {
			console.log(values);
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
			<button type="submit">Login with credentials</button>
		</form>
	);
};

export default LoginForm;
