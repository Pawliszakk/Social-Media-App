'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import classes from './ActionBarOption.module.scss';
import LogoutBtn from '../Auth/Buttons/Logout';
import { useEffect, useState } from 'react';

interface ActionBarOptionProps {
	option: {
		icon: React.ReactNode;
		href?: string;
		text: string;
		name?: string | null | undefined;
		image?: string | null | undefined;
		avatar?: boolean;
		logout?: boolean;
		search?: boolean;
	};
	isSearch: boolean;
	onSearch: () => void;
	imageType: string;
}

const ActionBarOption: React.FC<ActionBarOptionProps> = (props) => {
	const { option, imageType, onSearch, isSearch } = props;
	const { href, icon, text, avatar, logout, image, name, search } = option;

	const [isMobile, setIsMobile] = useState(false);

	const pathname = usePathname();
	let active;
	if (pathname === href) {
		active = true;
	}
	const classNames = `${classes.option} ${active ? classes.active : null}  ${
		!isSearch ? classes.search : null
	}`;
	const isAvatarChanged = imageType === 'provider';

	const handleResize = () => {
		const width = window.innerWidth;
		setIsMobile(width < 768);
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const avatarToShow: string = !isAvatarChanged
		? `https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${image}`
		: image!;

	if (avatar && href) {
		return (
			<Link href={href} className={classNames}>
				<Image
					src={image ? `${avatarToShow}` : '/assets/defaultUser.jpg'}
					width={35}
					height={35}
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
			<LogoutBtn className={classNames}>
				{icon} <span>{text}</span>
			</LogoutBtn>
		);
	}
	if (search) {
		return (
			<>
				{isMobile ? (
					<Link className={classNames} href="/search">
						{icon}
					</Link>
				) : (
					<button onClick={onSearch} className={classNames}>
						{icon} <span>Search</span>
					</button>
				)}
			</>
		);
	}
};

export default ActionBarOption;
