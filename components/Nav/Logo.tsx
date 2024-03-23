import Link from 'next/link';
import classes from './Logo.module.scss';
const Logo = () => {
	return (
		<div className={classes.logo}>
			<Link href="/">Instagram</Link>
		</div>
	);
};

export default Logo;
