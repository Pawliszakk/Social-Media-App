import classes from './SuggestedUserSkeleton.module.scss';

const SuggestedUserSkeleton = () => {
	const suggestedUserElements = [];

	for (let i = 0; i < 15; i++) {
		suggestedUserElements.push(
			<div key={i} className={classes.box}>
				<div className={classes.info}>
					<div className={classes.image}></div>
					<div>
						<div className={classes.name}></div>
						<div className={classes.name}></div>
					</div>
				</div>
				<button></button>
			</div>
		);
	}

	return <>{suggestedUserElements}</>;
};

export default SuggestedUserSkeleton;
