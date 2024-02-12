'use client';
import Link from 'next/link';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { MdOutlineCollectionsBookmark } from 'react-icons/md';
import classes from './PostsLinks.module.scss';
import { usePathname } from 'next/navigation';

const PostsLinks = ({ profileId }: { profileId: string }) => {
	const pathname = usePathname();

	const isSaved = pathname === `/profile/${profileId}/saved`;

	return (
		<div className={classes.options}>
			<Link
				href={`/profile/${profileId}`}
				className={`${classes.option} ${!isSaved ? classes.active : null}`}
			>
				<HiOutlineSquares2X2 />
				POSTS
			</Link>

			<Link
				href={`/profile/${profileId}/saved`}
				className={`${classes.option} ${isSaved ? classes.active : null}`}
			>
				<MdOutlineCollectionsBookmark />
				SAVED
			</Link>
		</div>
	);
};

export default PostsLinks;
