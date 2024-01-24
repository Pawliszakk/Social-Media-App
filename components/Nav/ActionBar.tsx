import classes from './ActionBar.module.scss';
import { IoMdHome } from 'react-icons/io';
import { MdOutlineExplore } from 'react-icons/md';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { IoSearchSharp } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import { cookies } from 'next/headers';
import ActionBarOption from './ActionBarOption';

const ActionBar = () => {
	const image = cookies().get('image');
	const name = cookies().get('name');
	const userId = cookies().get('userId');

	const menuOptions = [
		{ href: '/', icon: <IoMdHome />, text: 'Home Page' },
		{ href: '/?search=true', icon: <IoSearchSharp />, text: 'Search' },
		{ href: '/explore', icon: <MdOutlineExplore />, text: 'Explore' },
		{ href: '/?create=true', icon: <IoMdAddCircleOutline />, text: 'Create' },
		{ href: '/settings', icon: <IoSettingsOutline />, text: 'Settings' },
		{
			href: `/profile/${userId!.value}`,
			icon: <IoSettingsOutline />,
			text: 'Profile',
			image: image?.value,
			avatar: true,
			name: name?.value,
		},
		{ icon: <MdLogout />, text: 'Logout', logout: true },
	];

	return (
		<header className={classes.header}>
			<div className={classes.logo}>
				<h1>{'<Logo Aplikacji> '}</h1>
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
					/>
				))}
			</nav>
		</header>
	);
};

export default ActionBar;
