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
	return (
		<div className={classes.box}>
			<h2>Settings</h2>

			<div className={classes.options}>
				<p>How you use app</p>
				<SettingLink
					key="edit"
					href="edit"
					icon={<FaUserEdit />}
					text="Edit profile"
				/>
				<p>What you see</p>
				<SettingLink
					key="like_count"
					href="like_count"
					icon={<LuHeartOff />}
					text="Like counts"
				/>
				<SettingLink
					key="appearance"
					href="appearance"
					icon={<MdOutlineLightMode />}
					text="Switch appearance"
				/>
				<p>Who can see your content</p>
				<SettingLink
					key="privacy"
					href="privacy"
					icon={<IoLockClosedOutline />}
					text="Account privacy"
				/>
				<SettingLink
					key="blocked_accounts"
					href="blocked_accounts"
					icon={<MdOutlineDoNotDisturbAlt />}
					text="Blocked accounts"
				/>
				<SettingLink
					key="close_friends"
					href="close_friends"
					icon={<GiAlliedStar />}
					text="Close friends"
				/>
				<p>How others can interact with you</p>
				<SettingLink
					key="comments"
					href="comments"
					icon={<FiMessageCircle />}
					text="Comments"
				/>
			</div>
		</div>
	);
};

export default SettingsNavbar;
