import Posts from '@/components/Profile/Posts/Posts';
import classes from './page.module.scss';
import Link from 'next/link';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { getUserData } from '@/lib/actions/utils/getUserData';

const archivePage = async () => {
	const { session, user } = await getUserData('name showLikes posts', 'posts');

	const archivedPosts = user.posts
		.filter((post: any) => post.archived)
		.reverse();

	return (
		<div className={classes.box}>
			<Link href={`/profile/${user.id}`}>
				<IoIosArrowRoundBack />
				Go back
			</Link>

			<h2>Your archived posts</h2>
			<p>Archived posts will only be visible to you unless you share them.</p>
			<Posts
				posts={archivedPosts}
				authorName={user.name}
				userId={user.id}
				showLikes={user.showLikes}
			/>
		</div>
	);
};

export default archivePage;
