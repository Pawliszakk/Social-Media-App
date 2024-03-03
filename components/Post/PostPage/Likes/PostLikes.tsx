import { transformPostDate } from '@/lib/helpers/transformPostDate';
import classes from './PostLikes.module.scss';

interface PostLikesProps {
	date: number;
	likes: number;
	showLikes: boolean;
	isUserAuthor: boolean;
}

const PostLikes: React.FC<PostLikesProps> = (props) => {
	const dateToDisplay = transformPostDate(props.date);

	return (
		<div className={classes.likes}>
			{props.isUserAuthor || (!props.isUserAuthor && props.showLikes) ? (
				<p>
					<span>{props.likes}</span> Likes
				</p>
			) : (
				<p>Likes count hidden on your account</p>
			)}

			<p suppressHydrationWarning={true} className={classes.date}>
				{dateToDisplay}
			</p>
		</div>
	);
};

export default PostLikes;
