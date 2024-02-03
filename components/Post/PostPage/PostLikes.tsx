import classes from './PostLikes.module.scss';

interface PostLikesProps {
	likes: string[] | [];
	date: string;
}

const PostLikes: React.FC<PostLikesProps> = ({ likes, date }) => {
	return (
		<div className={classes.likes}>
			<p>
				<span>{likes.length}</span> Likes
			</p>
			<p className={classes.date}>{date}</p>
		</div>
	);
};

export default PostLikes;
