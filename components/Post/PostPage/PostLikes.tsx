import classes from './PostLikes.module.scss';

interface PostLikesProps {
	likes: number;
	date: string;
}

const PostLikes: React.FC<PostLikesProps> = (props) => {
	return (
		<div className={classes.likes}>
			<p>
				<span>{props.likes}</span> Likes
			</p>
			<p className={classes.date}>{props.date}</p>
		</div>
	);
};

export default PostLikes;
