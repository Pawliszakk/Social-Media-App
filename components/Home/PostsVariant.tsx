import Link from 'next/link';
import classes from './PostsVariant.module.scss';

const PostsVariant = () => {
	return (
		<div className={classes.variant}>
			<div>
				<Link href="?variant=all">All Posts</Link>
				<Link href="?variant=following">Following</Link>
			</div>
			<hr />
		</div>
	);
};

export default PostsVariant;
