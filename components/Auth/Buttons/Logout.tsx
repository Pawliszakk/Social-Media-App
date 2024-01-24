'use client';
import { signOut } from 'next-auth/react';
import classes from './Logout.module.scss';
interface LogoutBtnProps {
	children: React.ReactNode | string;
	className?: string;
}

const LogoutBtn: React.FC<LogoutBtnProps> = ({ children, className }) => {
	return (
		<button
			className={`${classes.btn} ${className ? className : null}`}
			onClick={() => signOut()}
		>
			{children}
		</button>
	);
};

export default LogoutBtn;
