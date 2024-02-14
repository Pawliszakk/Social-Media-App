import Link from 'next/link';
import classes from './SettingsNavbar.module.scss';
import { FaUserEdit } from 'react-icons/fa';
import { IoLockClosedOutline } from 'react-icons/io5';
import { MdOutlineDoNotDisturbAlt } from 'react-icons/md';
import { LuHeartOff } from 'react-icons/lu';
import { GiAlliedStar } from 'react-icons/gi';
import { FiMessageCircle } from 'react-icons/fi';
import { MdOutlineLightMode } from 'react-icons/md';
import SettingLink from './SettingLink';
const SettingsNavbar = () => {
	const settingsLinks = [
		{ href: 'edit', icon: <FaUserEdit />, text: 'Edit profile' },
		{
			href: 'privacy',
			icon: <IoLockClosedOutline />,
			text: 'Account privacy',
		},
		{
			href: 'blocked_accounts',
			icon: <MdOutlineDoNotDisturbAlt />,
			text: 'Blocked accounts',
		},
		{ href: 'like_count', icon: <LuHeartOff />, text: 'Like counts' },
		{
			href: 'close_friends',
			icon: <GiAlliedStar />,
			text: 'Close friends',
		},
		{ href: 'comments', icon: <FiMessageCircle />, text: 'Comments' },
		{
			href: 'appearance',
			icon: <MdOutlineLightMode />,
			text: 'Switch appearance',
		},
	];

	return (
		<div className={classes.box}>
			<div>
				<h1>Settings</h1>
			</div>

			<div className={classes.options}>
				{settingsLinks.map((l) => (
					<SettingLink key={l.href} href={l.href} icon={l.icon} text={l.text} />
				))}
			</div>
		</div>
	);
};

export default SettingsNavbar;
