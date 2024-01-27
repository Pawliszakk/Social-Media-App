'use client';
import classes from './error.module.scss';
import Link from 'next/link';

const Error = ({
	error,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	return (
		<div className={classes.error}>
			<h3>{error.message}</h3>
			<p>
				The link you clicked may have been broken or the page may have been
				deleted. <Link href="/"> Return to App</Link>
			</p>
		</div>
	);
};

export default Error;
