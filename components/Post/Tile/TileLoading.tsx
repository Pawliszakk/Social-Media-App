import PostsBox from '@/components/Profile/Posts/PostsBox';
import classes from './PostTile.module.scss';

const TileLoading = () => {
	const classNames = `${classes.tile} ${classes.loading}`;

	return (
		<PostsBox>
			<div className={classNames}></div>
			<div className={classNames}></div>
			<div className={classNames}></div>
		</PostsBox>
	);
};

export default TileLoading;
