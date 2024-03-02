import Posts from '@/components/Profile/Posts/Posts';
import classes from './page.module.scss';
import { getArchivedPosts } from '@/lib/actions/user/getArchivedPosts';
import { getSessionData } from '@/lib/actions/utils/getSessionData';
import Link from 'next/link';
import { IoIosArrowRoundBack } from 'react-icons/io';

const archivePage = async () => {
	const { session, user } = await getSessionData();

	const authorName = user?.name;

	const { posts } = await getArchivedPosts(user?.userId);
	return (
		<div className={classes.box}>
			<Link href={`/profile/${user?.userId}`}>
				<IoIosArrowRoundBack />
				Go back
			</Link>

			<h2>Your archived posts</h2>
			<p>Archived posts will only be visible to you unless you share them.</p>
			<Posts
				posts={posts}
				authorName={`${authorName}`}
				userId={user?.userId}
				showLikes={user?.showLikes}
			/>
		</div>
	);
};

export default archivePage;
