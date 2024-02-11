import classes from './PostsBox.module.scss';

const PostsBox = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={classes.box}>
			<hr />
			{children}
		</div>
	);
};

export default PostsBox;
