import classes from './ActionBar.module.scss';
import { IoMdHome } from 'react-icons/io';
import { MdOutlineExplore } from 'react-icons/md';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { IoSearchSharp } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import Image from 'next/image';
import { cookies } from 'next/headers';
import Link from 'next/link';
import LogoutBtn from '../Auth/Buttons/Logout';

const ActionBar = () => {
	const image = cookies().get('image');
	const name = cookies().get('name');
	const userId = cookies().get('userId');

	return (
		<header className={classes.header}>
			<div className={classes.logo}>
				<h1>{'<Logo Aplikacji> '}</h1>
			</div>

			<nav>
				<Link href="/app" className={classes.option}>
					<IoMdHome /> <span>Home Page</span>
				</Link>

				<Link href="/app?search=true" className={classes.option}>
					<IoSearchSharp /> <span>Search</span>
				</Link>

				<Link href="/app/explore" className={classes.option}>
					<MdOutlineExplore /> <span>Explore</span>
				</Link>

				<Link href="/app?create=true" className={classes.option}>
					<IoMdAddCircleOutline /> <span>Create</span>
				</Link>

				<Link href="/app/settings" className={classes.option}>
					<IoSettingsOutline /> <span>Settings</span>
				</Link>

				<Link href={`/app/${userId!.value}`} className={classes.option}>
					<Image
						src={image ? image.value : '/assets/defaultUser.jpg'}
						width={40}
						height={40}
						alt={`Profile picture of ${name!.value}`}
					/>
					<span style={{ textDecoration: 'none' }}>Profile</span>
				</Link>
				<LogoutBtn className={classes.option}>
					<MdLogout /> <span>Logout</span>
				</LogoutBtn>
			</nav>
		</header>
	);
};

export default ActionBar;
