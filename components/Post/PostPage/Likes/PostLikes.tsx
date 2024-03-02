import classes from './PostLikes.module.scss';

interface PostLikesProps {
	date: string;
	likes: number;
	showLikes: boolean;
	isUserAuthor: boolean;
}

const PostLikes: React.FC<PostLikesProps> = (props) => {
	return (
		<div className={classes.likes}>
			{props.isUserAuthor || (!props.isUserAuthor && props.showLikes) ? (
				<p>
					<span>{props.likes}</span> Likes
				</p>
			) : (
				<p>Likes count hidden on your account</p>
			)}

			<p className={classes.date}>{props.date}</p>
		</div>
	);
};

export default PostLikes;
