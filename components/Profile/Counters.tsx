import classes from './Counters.module.scss';

interface CountersProps {
	postsLength: number;
	followersLength: number;
	followingLength: number;
}

const Counters: React.FC<CountersProps> = (props) => {
	return (
		<div className={classes.data}>
			<div>
				<p>
					Posts: <span>{props.postsLength}</span>
				</p>
			</div>
			<div>
				<p>
					followers: <span>{props.followersLength}</span>
				</p>
			</div>
			<div>
				<p>
					following: <span>{props.followingLength}</span>
				</p>
			</div>
		</div>
	);
};

export default Counters;
