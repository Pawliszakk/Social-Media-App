import Spinner from '@/components/UI/Spinner';
import classes from './PostAddComment.module.scss';
import ProfileImage from '@/components/UI/User/ProfileImage';
import { addComment } from '@/lib/actions/post/comments/addComment';
import { ChangeEvent, FormEvent, useState } from 'react';

interface PostAddCommentProps {
	postId: string;
	user: {
		image: string;
		imageType: string;
		name: string;
		id: string;
	};
}

const PostAddComment: React.FC<PostAddCommentProps> = ({ user, postId }) => {
	const [comment, setComment] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const isCommentEmpty = comment.trim().length === 0;
	const isCommentTooLarge = comment.length > 2200;

	const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setComment(e.target.value);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		await addComment(postId, comment);
		setIsLoading(false);
	};
	return (
		<div className={classes.add}>
			<ProfileImage
				image={user.image}
				name={user.name}
				imageType={user.imageType}
			/>
			<form onSubmit={handleSubmit}>
				<div className={classes.commentBox}>
					<textarea
						name="comment"
						id="comment"
						value={comment}
						onChange={handleTextareaChange}
						placeholder="Add a comment..."
					></textarea>
					{isLoading ? (
						<Spinner />
					) : (
						!isCommentEmpty &&
						!isCommentTooLarge && <button type="submit">Post</button>
					)}
				</div>
				{isCommentTooLarge && (
					<p>Comment should have less than 2,200 characters</p>
				)}
			</form>
		</div>
	);
};

export default PostAddComment;
