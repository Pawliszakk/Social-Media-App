import Author from './Author';
import classes from './Stories.module.scss';
interface StoriesProps {
	user: {
		image: string;
		imageType: string;
		name: string;
	};
}

const Stories: React.FC<StoriesProps> = ({ user }) => {
	return (
		<div className={classes.box}>
			<Author user={user} />
			<Author user={user} />
			<Author user={user} />
			<Author user={user} />
			<Author user={user} />
			<Author user={user} />
			<Author user={user} />
			<Author user={user} />
			<Author user={user} />
			<Author user={user} />
			<Author user={user} />
		</div>
	);
};

export default Stories;
