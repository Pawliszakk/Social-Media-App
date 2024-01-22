import { useState } from 'react';
import { FieldInputProps } from 'formik';

import classes from './Input.module.scss';
import { BiErrorCircle } from 'react-icons/bi';
import { IoEyeSharp, IoEyeOff } from 'react-icons/io5';

interface InputProps {
	field: FieldInputProps<string>;
	name: string;
	placeholder: string;
	label?: string;
	type: string;
	error?: string;
	touched?: boolean;
}

const Input: React.FC<InputProps> = ({
	field,
	placeholder,
	label,
	type,
	error,
	name,
	touched,
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const isPassword = type === 'password';

	const isError = touched && error;

	const inputType = isPasswordVisible ? 'text' : 'password';

	const passwordVisibilityHandler = () => {
		setIsPasswordVisible((prevState) => !prevState);
	};

	return (
		<div className={classes.box}>
			<label htmlFor={name}>{label}</label>
			<div>
				<input
					id={name}
					type={!isPassword ? type : inputType}
					{...field}
					placeholder={placeholder}
				/>
				{isPassword && isPasswordVisible && (
					<IoEyeOff onClick={passwordVisibilityHandler} />
				)}
				{isPassword && !isPasswordVisible && (
					<IoEyeSharp onClick={passwordVisibilityHandler} />
				)}
			</div>
			{isError ? (
				<p>
					{error} <BiErrorCircle />
				</p>
			) : null}
		</div>
	);
};

export default Input;
