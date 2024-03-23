import Link from 'next/link';
import classes from './Logo.module.scss';
import { FaInstagram } from 'react-icons/fa';

interface LogoProps {
	isSearch: boolean;
}

const Logo: React.FC<LogoProps> = ({ isSearch }) => {
	return (
		<div className={`${classes.logo} ${isSearch ? classes.search : null}`}>
			<Link href="/">
				<FaInstagram /> <span>Instagram</span>
			</Link>
		</div>
	);
};

export default Logo;
