import classes from './SearchedUserSkeleton.module.scss';

const SearchedUserSkeleton = () => {
	return (
		<div className={classes.user}>
			<div className={classes.image}></div>
			<div className={classes.name}></div>
		</div>
	);
};

export default SearchedUserSkeleton;
