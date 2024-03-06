'use client';

import Link from 'next/link';
import classes from './PeopleLinks.module.scss';
import { usePathname } from 'next/navigation';

const PeopleLinks = () => {
	const pathname = usePathname();

	const isTopPage = pathname === '/explore/people/top_accounts';

	return (
		<div className={classes.links}>
			<Link
				href="/explore/people"
				className={`${!isTopPage ? classes.active : null}`}
			>
				Suggested for you
			</Link>
			<Link
				href="/explore/people/top_accounts"
				className={`${isTopPage ? classes.active : null}`}
			>
				More accounts
			</Link>
		</div>
	);
};

export default PeopleLinks;
