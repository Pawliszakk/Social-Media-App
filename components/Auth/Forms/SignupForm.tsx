'use client';
import { SignupSchema } from '@/lib/validation/validation';
import Input from './Input';
import { useFormik } from 'formik';
import SubmitButton from '../Buttons/SubmitButton';

const SignupForm = () => {
	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
		},
		validationSchema: SignupSchema,
		onSubmit: (values) => {
			console.log(values);
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
			<SubmitButton>Signup with credentials</SubmitButton>
		</form>
	);
};

export default SignupForm;
