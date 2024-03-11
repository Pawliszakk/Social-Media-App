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
					<span>{props.postsLength}</span>{' '}
					{props.postsLength === 1 ? 'post' : 'posts'}
				</p>
			</div>
			<div>
				<p>
					<span>{props.followersLength}</span> followers
				</p>
			</div>
			<div>
				<p>
					<span>{props.followingLength}</span> following
				</p>
			</div>
		</div>
	);
};

export default Counters;
