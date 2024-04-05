import { getStories } from '@/lib/actions/stories/getStories';
import Author from './Author';
import classes from './Stories.module.scss';
import StoryIcon from './StoryIcon';
import { getUserStories } from '@/lib/actions/stories/getUserStories';
import { Story } from '@/lib/actions/Models/story';
interface StoriesProps {
	user: {
		id: string;
		image: string;
		imageType: string;
		name: string;
	};
}

const Stories: React.FC<StoriesProps> = async ({ user }) => {
	const stories = await getStories();
	// const userStories = await getUserStories();
	console.log(stories);
	return (
		<div className={classes.box}>
			<Author user={user} />

			{stories?.map((story: any) => (
				<StoryIcon
					key={story.id}
					watched={story.isWatched}
					user={story.author}
				/>
			))}
		</div>
	);
};

export default Stories;
