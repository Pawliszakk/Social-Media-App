import Comment from './Comment';
import classes from './PostComments.module.scss';

interface PostCommentsProps {
	isCommenting: boolean;
	userId: string;
	comments:
		| {
				name: string;
				id: string;
				image: string;
				imageType: string;
				replies: number;
				likes: number;
				isUserLikingComment: boolean;
				author: {
					name: string;
					id: string;
					image: string;
					imageType: string;
				};
		  }[]
		| string[];
	onReply: (authorName: string, commentId: string) => void;
}

const PostComments: React.FC<PostCommentsProps> = ({
	isCommenting,
	comments,
	userId,
	onReply,
}) => {
	const areCommentsEmpty = comments.length === 0 || !comments;
	return (
		<div className={classes.comments}>
			{isCommenting ? (
				areCommentsEmpty ? (
					<p>No one commented this post yet.</p>
				) : (
					comments.map((comment: any) => (
						<Comment
							onReply={onReply}
							userId={userId}
							comment={comment}
							key={comment.id}
						/>
					))
				)
			) : (
				<h1>Comments Blocked</h1>
			)}
		</div>
	);
};

export default PostComments;
