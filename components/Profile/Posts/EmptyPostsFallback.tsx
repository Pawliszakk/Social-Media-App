import { IoCameraOutline } from 'react-icons/io5';
import classes from './EmptyPostsFallback.module.scss';

interface EmptyPostsFallbackProps {
	name: string;
	profile?: boolean;
}

const EmptyPostsFallback: React.FC<EmptyPostsFallbackProps> = (props) => {
	return (
		<div className={`${classes.box} ${props.profile ? classes.profile : null}`}>
			<div className={classes.icon}>
				<IoCameraOutline />
			</div>
			<span>No posts yet.</span>
			<p>
				When {props.name} shares photos and reels, you&apos;ll see them here.
			</p>
		</div>
	);
};

export default EmptyPostsFallback;
