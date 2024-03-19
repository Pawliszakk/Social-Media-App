'use client';
import Spinner from '@/components/UI/Spinner';
import classes from './PostAddComment.module.scss';
import ProfileImage from '@/components/UI/User/ProfileImage';
import { addComment } from '@/lib/actions/post/comments/addComment';
import { ChangeEvent, FormEvent, useState } from 'react';
import { addReply } from '@/lib/actions/post/comments/addReply';

interface PostAddCommentProps {
	postId: string;
	user: {
		image: string;
		imageType: string;
		name: string;
		id: string;
	};
	replyCommentData?: { authorName: string; commentId: string } | null;
	home?: boolean;
}

const PostAddComment: React.FC<PostAddCommentProps> = ({
	user,
	home,
	postId,
	replyCommentData,
}) => {
	const [comment, setComment] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const isCommentEmpty = comment.trim().length === 0;
	const isCommentTooLarge = comment.length > 2200;

	const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setComment(e.target.value);
	};

	const handleSubmit = async (
		e: FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>
	) => {
		e.preventDefault();
		setIsLoading(true);
		if (!!replyCommentData) {
			await addReply(replyCommentData.commentId, comment);
		} else {
			await addComment(postId, comment);
		}
		setComment('');
		setIsLoading(false);
	};
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e);
		}
	};
	return (
		<div className={`${classes.add} ${home ? classes.home : null}`}>
			<form onSubmit={handleSubmit}>
				<div className={`${classes.commentBox} ${home ? classes.home : null}`}>
					<div className={classes.image}>
						{!home && (
							<ProfileImage
								image={user.image}
								name={user.name}
								imageType={user.imageType}
							/>
						)}
						<textarea
							name="comment"
							id="comment"
							value={comment}
							onChange={handleTextareaChange}
							placeholder={
								!!replyCommentData
									? `Replying to ${replyCommentData.authorName}...`
									: 'Add a comment...'
							}
							onKeyDown={handleKeyDown}
						></textarea>
					</div>
					{isLoading ? (
						<Spinner />
					) : (
						!isCommentEmpty &&
						!isCommentTooLarge && (
							<button type="submit">
								{!!replyCommentData ? 'Reply' : 'Post'}
							</button>
						)
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
