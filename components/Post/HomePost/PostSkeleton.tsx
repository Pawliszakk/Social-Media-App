import classes from './PostSkeleton.module.scss';

const PostSkeleton = () => {
	return (
		<article className={classes.post}>
			<div className={classes.author}>
				<div className={classes.image}>
					<div className={classes.avatar}></div>
					<div className={classes.date}></div>
				</div>
				<div className={classes.btn}></div>
			</div>
			<div className={classes.images}></div>
			<div className={classes.actions}>
				<div></div>
				<div></div>
			</div>
			<hr />
		</article>
	);
};

export default PostSkeleton;
