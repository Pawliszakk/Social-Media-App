'use client';
import { signOut } from 'next-auth/react';
import classes from './Logout.module.scss';

const Logout = () => {
	return (
		<button className={classes.button} onClick={() => signOut()}>
			Logout
		</button>
	);
};

export default Logout;
