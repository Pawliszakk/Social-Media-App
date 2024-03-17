import Link from 'next/link';
import classes from './CommentsLink.module.scss';

interface CommentsLinkProps {
	commentsLength: number;
	postId: string;
}

const CommentsLink: React.FC<CommentsLinkProps> = ({
	commentsLength,
	postId,
}) => {
	return (
		<div className={classes.comments}>
			{commentsLength > 1 && (
				<Link href={`/post/${postId}`}>View all {commentsLength} comments</Link>
			)}
			{commentsLength === 1 && (
				<Link href={`/post/${postId}`}>View 1 comment</Link>
			)}
			{commentsLength === 0 && <p>No one commented this post yet.</p>}
		</div>
	);
};

export default CommentsLink;
