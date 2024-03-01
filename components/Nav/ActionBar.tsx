import classes from './ActionBar.module.scss';

import { IoMdHome } from 'react-icons/io';
import { MdOutlineExplore } from 'react-icons/md';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { IoSearchSharp } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import ActionBarOption from './ActionBarOption';

interface ActionBarProps {
	name: string | null | undefined;
	image: string | null | undefined;
	imageType: string;
	userId: string | null | undefined;
}

const ActionBar: React.FC<ActionBarProps> = ({
	name,
	image,
	userId,
	imageType,
}) => {
	const menuOptions = [
		{ href: '/', icon: <IoMdHome />, text: 'Home Page' },
		{ href: '/?search=true', icon: <IoSearchSharp />, text: 'Search' },
		{ href: '/explore', icon: <MdOutlineExplore />, text: 'Explore' },
		{ href: '/create', icon: <IoMdAddCircleOutline />, text: 'Create' },
		{ href: '/settings', icon: <IoSettingsOutline />, text: 'Settings' },
		{
			href: `/profile/${userId}`,
			icon: <IoSettingsOutline />,
			text: 'Profile',
			image: image,
			avatar: true,
			name: name,
		},
		{ icon: <MdLogout />, text: 'Logout', logout: true },
	];
	return (
		<header className={classes.header}>
			<div className={classes.logo}>
				<h1>Logo aplikacji</h1>
			</div>

			<nav>
				{menuOptions.map((option, i) => (
					<ActionBarOption
						key={i}
						href={option.href}
						icon={option.icon}
						text={option.text}
						avatar={option.avatar}
						image={option.image}
						name={option.name}
						logout={option.logout}
						imageType={imageType}
					/>
				))}
			</nav>
		</header>
	);
};

export default ActionBar;
