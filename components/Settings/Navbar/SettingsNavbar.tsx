import Link from 'next/link';
import classes from './SettingsNavbar.module.scss';
import { FaUserEdit } from 'react-icons/fa';
import { IoLockClosedOutline } from 'react-icons/io5';
import { MdOutlineDoNotDisturbAlt } from 'react-icons/md';
import { LuHeartOff } from 'react-icons/lu';
import { GiAlliedStar } from 'react-icons/gi';
import { FiMessageCircle } from 'react-icons/fi';
import { MdOutlineLightMode } from 'react-icons/md';
const SettingsNavbar = () => {
	return (
		<div className={classes.box}>
			<div>
				<h1>Settings</h1>
			</div>

			<div className={classes.options}>
				<Link href="/settings/edit">
					<FaUserEdit />
					Edit profile
				</Link>
				<Link href="/settings/privacy">
					<IoLockClosedOutline />
					Account privacy
				</Link>
				<Link href="/settings/blocked_accounts">
					<MdOutlineDoNotDisturbAlt />
					Blocked accounts
				</Link>
				<Link href="/settings/like_count">
					<LuHeartOff />
					Like counts
				</Link>
				<Link href="/settings/close_friends">
					<GiAlliedStar />
					Close friends
				</Link>
				<Link href="/settings/comments">
					<FiMessageCircle />
					Comments
				</Link>
				<Link href="/settings/appearance">
					<MdOutlineLightMode />
					Switch appearance
				</Link>
			</div>
		</div>
	);
};

export default SettingsNavbar;
