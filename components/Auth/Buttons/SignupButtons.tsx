'use client';

import { signIn } from 'next-auth/react';
import classes from './SignupButtons.module.scss';
import { FaGoogle } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { useState } from 'react';

const SignupButtons = () => {
	const [isLoading, setIsLoading] = useState(false);

	const SigninButtonsData = [
		{
			provider: 'google',
			icon: <FaGoogle />,
			text: 'Google',
			class: classes.google,
		},
		{
			provider: 'github',
			icon: <FaGithub />,
			text: 'Github',
			class: classes.github,
		},
		{
			provider: 'facebook',
			icon: <FaFacebook />,
			text: 'Facebook',
			class: classes.facebook,
		},
	];

	return (
		<div className={classes.buttons}>
			{SigninButtonsData.map((btn) => (
				<button
					key={btn.provider}
					className={btn.class}
					onClick={() => {
						setIsLoading(true);
						signIn(btn.provider);
					}}
					disabled={isLoading}
				>
					{btn.icon}
					<span>Sign with {btn.text}</span>
				</button>
			))}

			<hr />
		</div>
	);
};

export default SignupButtons;
