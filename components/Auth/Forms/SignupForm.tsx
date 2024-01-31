'use client';
import { useState } from 'react';
import { useFormik } from 'formik';
import { SignupSchema } from '@/lib/validation/validation';
import { signIn } from 'next-auth/react';
import Input from './Input';
import SubmitButton from '../Buttons/SubmitButton';

const SignupForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
		},
		validationSchema: SignupSchema,
		onSubmit: (values) => {
			setIsLoading(true);
			signIn('signupCredentials', { ...values });
		},
	});

	const { touched, errors, handleSubmit, getFieldProps } = formik;

	return (
		<form onSubmit={handleSubmit}>
			<Input
				label="Name"
				name="name"
				type="text"
				placeholder="Enter your name"
				error={errors.name}
				touched={touched.name}
				field={getFieldProps('name')}
			/>
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
			<SubmitButton loading={isLoading}>Signup with credentials</SubmitButton>
		</form>
	);
};

export default SignupForm;
