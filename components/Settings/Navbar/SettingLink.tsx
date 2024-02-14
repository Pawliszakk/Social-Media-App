'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import classes from './SettingLink.module.scss';
interface SettingLinkProps {
	href: string;
	icon: JSX.Element;
	text: string;
}

const SettingLink: React.FC<SettingLinkProps> = (props) => {
	const pathname = usePathname();

	const currentSetting = pathname.split('/')[2];

	const isActive = currentSetting === props.href;

	return (
		<Link
			className={`${classes.link} ${isActive ? classes.active : ''}`}
			href={props.href}
		>
			{props.icon} {props.text}
		</Link>
	);
};

export default SettingLink;
