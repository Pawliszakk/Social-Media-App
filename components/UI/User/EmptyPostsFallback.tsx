import classes from './EmptyPostsFallback.module.scss';
import { IoCameraOutline } from 'react-icons/io5';

interface EmptyPostsFallbackProps {
	name: string;
}

const EmptyPostsFallback: React.FC<EmptyPostsFallbackProps> = ({ name }) => {
	return (
		<div className={classes.box}>
			<div className={classes.icon}>
				<IoCameraOutline />
			</div>
			<span>No posts yet.</span>
			<p>When {name} shares photos and reels, you&apos;ll see them here.</p>
		</div>
	);
};

export default EmptyPostsFallback;
