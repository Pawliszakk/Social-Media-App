
import classes from './PostComments.module.scss';

interface PostCommentsProps {
	isCommenting: boolean;
}

const PostComments: React.FC<PostCommentsProps> = ({ isCommenting }) => {
	return (
		<div className={classes.comments}>
			{isCommenting ? <h1>Comments Available</h1> : <h1>Comments Blocked</h1>}
		</div>
	);
};

export default PostComments;
