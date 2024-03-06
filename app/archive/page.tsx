import Posts from '@/components/Profile/Posts/Posts';
import classes from './page.module.scss';
import { getArchivedPosts } from '@/lib/actions/user/getArchivedPosts';
import Link from 'next/link';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { getUserData } from '@/lib/actions/utils/getUserData';

const archivePage = async () => {
	const { session, user } = await getUserData('name', 'showLikes');

	const { posts } = await getArchivedPosts(user.id);

	return (
		<div className={classes.box}>
			<Link href={`/profile/${user.id}`}>
				<IoIosArrowRoundBack />
				Go back
			</Link>

			<h2>Your archived posts</h2>
			<p>Archived posts will only be visible to you unless you share them.</p>
			<Posts
				posts={posts}
				authorName={user.name}
				userId={user.id}
				showLikes={user.showLikes}
			/>
		</div>
	);
};

export default archivePage;
