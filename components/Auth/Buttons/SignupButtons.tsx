'use client';

import { signIn } from 'next-auth/react';
import classes from './SignupButtons.module.scss';
import { FaGoogle } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';

const SignupButtons = () => {
	return (
		<div className={classes.buttons}>
			<button className={classes.google} onClick={() => signIn('google')}>
				<FaGoogle />
				<span>Sign with Google</span>
			</button>
			<button className={classes.github} onClick={() => signIn('github')}>
				<FaGithub />
				<span>Sign with Github</span>
			</button>
			<button className={classes.facebook} onClick={() => signIn('facebook')}>
				<FaFacebook />
				<span>Sign with Facebook</span>
			</button>
		</div>
	);
};

export default SignupButtons;
