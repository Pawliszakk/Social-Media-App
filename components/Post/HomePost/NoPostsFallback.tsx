import Link from 'next/link';
import classes from './NoPostsFallback.module.scss';

const NoPostsFallback = () => {
	return (
		<div className={classes.box}>
			<h2>We found no posts.</h2>
			<p>
				Maybe create one? <Link href="/create">Create Post</Link>
			</p>
		</div>
	);
};

export default NoPostsFallback;
