'use client';

import Link from 'next/link';
import classes from './ActionBarOption.module.scss';
import Image from 'next/image';
import LogoutBtn from '../Auth/Buttons/Logout';
import { usePathname } from 'next/navigation';

interface ActionBarOptionProps {
	href?: string;
	icon: React.ReactNode;
	text: string;
	avatar?: boolean;
	logout?: boolean;
	image?: string;
	name?: string;
}

const ActionBarOption: React.FC<ActionBarOptionProps> = ({
	href,
	icon,
	text,
	avatar,
	logout,
	image,
	name,
}) => {
	const pathname = usePathname();
	let active;
	if (pathname === href) {
		active = true;
	}
	const classNames = `${classes.option} ${active ? classes.active : null}`;

	if (avatar && href) {
		return (
			<Link href={href} className={classNames}>
				<Image
					src={image ? image : '/assets/defaultUser.jpg'}
					width={40}
					height={40}
					alt={`Profile picture of ${name}`}
				/>
				<span>{text}</span>
			</Link>
		);
	}
	if (href) {
		return (
			<Link href={href} className={classNames}>
				{icon} <span>{text}</span>
			</Link>
		);
	}
	if (logout) {
		return (
			<LogoutBtn className={classes.option}>
				{icon} <span>{text}</span>
			</LogoutBtn>
		);
	}
};

export default ActionBarOption;
