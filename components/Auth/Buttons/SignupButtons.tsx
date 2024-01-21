'use client';

import { signIn } from 'next-auth/react';
import classes from './SignupButtons.module.scss';
import { FaGoogle } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';

const SignupButtons = () => {
	return (
		<div className={classes.buttons}>
			<button onClick={() => signIn('google')}>
				<FaGoogle />
				<span>Google</span>
			</button>
			<button onClick={() => signIn('github')}>
				<FaGithub />
				<span>Github</span>
			</button>
			<button onClick={() => signIn('facebook')}>
				<FaFacebook />
				<span>Facebook</span>
			</button>
		</div>
	);
};

export default SignupButtons;
