import Link from 'next/link';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { MdOutlineCollectionsBookmark } from 'react-icons/md';
import classes from './PostsLinks.module.scss';

const PostsLinks = ({ profileId }: { profileId: string }) => {
	return (
		<div className={classes.options}>
			<Link href={`/profile/${profileId}`} className={classes.option}>
				<HiOutlineSquares2X2 />
				POSTS
			</Link>

			<Link href={`/profile/${profileId}/saved`} className={classes.option}>
				<MdOutlineCollectionsBookmark />
				SAVED
			</Link>
		</div>
	);
};

export default PostsLinks;
