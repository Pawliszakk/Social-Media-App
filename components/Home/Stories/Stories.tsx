import Author from './Author';
import classes from './Stories.module.scss';
import StoryIcon from './StoryIcon';
interface StoriesProps {
	user: {
		id: string;
		image: string;
		imageType: string;
		name: string;
	};
}

const Stories: React.FC<StoriesProps> = ({ user }) => {
	return (
		<div className={classes.box}>
			<Author user={user} />
			<StoryIcon watched={false} user={user} />
			<StoryIcon watched={false} user={user} />
			<StoryIcon watched={false} user={user} />
			<StoryIcon watched={false} user={user} />
			<StoryIcon watched={false} user={user} />
			<StoryIcon watched={false} user={user} />
			<StoryIcon watched={false} user={user} />
			<StoryIcon watched user={user} />
			<StoryIcon watched user={user} />
			<StoryIcon watched user={user} />
		</div>
	);
};

export default Stories;
