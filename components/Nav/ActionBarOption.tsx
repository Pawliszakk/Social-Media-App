'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import classes from './ActionBarOption.module.scss';
import LogoutBtn from '../Auth/Buttons/Logout';

interface ActionBarOptionProps {
	icon: React.ReactNode;
	imageType?: string;
	href?: string;
	text: string;
	name?: string | null | undefined;
	image?: string | null | undefined;
	avatar?: boolean;
	logout?: boolean;
}

const ActionBarOption: React.FC<ActionBarOptionProps> = ({
	href,
	icon,
	text,
	avatar,
	logout,
	image,
	name,
	imageType,
}) => {
	const pathname = usePathname();
	let active;
	if (pathname === href) {
		active = true;
	}
	const classNames = `${classes.option} ${active ? classes.active : null}`;

	const isProfileChanged = imageType === 'provider';
	const avatarToShow: string = isProfileChanged
		? `https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${image}`
		: image!;

	if (avatar && href) {
		return (
			<Link href={href} className={classNames}>
				<Image
					src={image ? `${avatarToShow}` : '/assets/defaultUser.jpg'}
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
