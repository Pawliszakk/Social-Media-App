import classes from './PostsBox.module.scss';

const PostsBox = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={classes.box}>
			<div className={classes.posts}>{children}</div>
		</div>
	);
};

export default PostsBox;
