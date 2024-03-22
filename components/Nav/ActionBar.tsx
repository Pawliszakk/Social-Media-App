'use client';
import classes from './ActionBar.module.scss';

import { IoMdHome } from 'react-icons/io';
import { MdOutlineExplore } from 'react-icons/md';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { IoSearchSharp } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import ActionBarOption from './ActionBarOption';
import { useRef, useState } from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';

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
	const [isSearch, setIsSearch] = useState(false);
	const menuOptions = [
		{ href: '/', icon: <IoMdHome />, text: 'Home' },
		{
			icon: <IoSearchSharp />,
			text: 'Search',
			search: true,
		},
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
	const actionBarRef = useRef<HTMLDivElement>(null);

	const showSearchHandler = () => setIsSearch(true);
	const hideSearchHandler = () => setIsSearch(false);
	
	return (
		<header
			ref={actionBarRef}
			className={` ${classes.header} ${isSearch ? classes.search : null}`}
		>
			<Logo />
			<nav>
				{menuOptions.map((option) => (
					<ActionBarOption
						key={option.text}
						option={option}
						imageType={imageType}
						onSearch={isSearch ? hideSearchHandler : showSearchHandler}
						isSearch={isSearch}
					/>
				))}
			</nav>
			{isSearch && (
				<SearchBar onClose={hideSearchHandler} actionBarRef={actionBarRef} />
			)}
		</header>
	);
};

export default ActionBar;
