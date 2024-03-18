import classes from './Comment.module.scss';
import { FaRegHeart } from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';
import { transformPostDate } from '@/lib/helpers/transformPostDate';
import { useState } from 'react';
import LikesModal from './LikesModal';
import { FaHeart } from 'react-icons/fa';
import {
	likeComment,
	unLikeComment,
} from '@/lib/actions/post/comments/likeComment';
import SettingsButton from '@/components/UI/Settings/SettingsButton';
import CommentSettings from './CommentSettings';
import { IoRemoveOutline } from 'react-icons/io5';
interface CommentProps {
	userId: string;
	comment: {
		name: string;
		id: string;
		image: string;
		imageType: string;
		answers: string[] | [];
		likes: number;
		isUserLikingComment: boolean;
		date: string;
		content: string;
		author: {
			name: string;
			id: string;
			image: string;
			imageType: string;
		};
	};
}

const Comment: React.FC<CommentProps> = ({ comment, userId }) => {
	const [isLikesModal, setIsLikesModal] = useState(false);
	const [likes, setLikes] = useState(comment.likes);
	const [isUserLikingComment, setIsUserLikingComment] = useState(
		comment.isUserLikingComment
	);
	const [isSettingsModal, setIsSettingsModal] = useState(false);
	const isUserAuthor = comment.author.id === userId;
	const showLikesHandler = () => {
		if (likes > 0) {
			setIsLikesModal(true);
		}
	};
	const closeLikesHandler = () => setIsLikesModal(false);

	const showSettingsHandler = () => setIsSettingsModal(true);
	const hideSettingsHandler = () => setIsSettingsModal(false);

	const transformedDate = transformPostDate(+comment.date);

	const doubleClickHandler = async () => {
		if (!isUserLikingComment) {
			setLikes((prev) => prev + 1);
			setIsUserLikingComment(true);
			await likeComment(comment.id);
		}
	};

	const likeCommentHandler = async () => {
		if (isUserLikingComment) {
			setLikes((prev) => prev - 1);
			setIsUserLikingComment(false);
			await unLikeComment(comment.id);
		} else {
			setLikes((prev) => prev + 1);
			setIsUserLikingComment(true);
			await likeComment(comment.id);
		}
	};

	return (
		<>
			<div className={classes.box1}>
				<div className={classes.box} onDoubleClick={doubleClickHandler}>
					{/* <ProfileImage /> */}
					<div className={classes.image}>
						<Image
							src="/assets/defaultUser.JPG"
							height={30}
							width={30}
							alt="Profile image of a user"
						/>
					</div>
					<div className={classes.comment}>
						<div className={classes.content}>
							<Link href="/">{comment.author.name}</Link>
							<p>{comment.content}</p>
						</div>
						<div className={classes.actions}>
							<span suppressHydrationWarning={true} className={classes.date}>
								{transformedDate}
							</span>
							<span
								onClick={showLikesHandler}
								className={`${likes === 0 ? classes.empty : null}`}
							>
								{likes} {likes === 1 ? 'like' : 'likes'}
							</span>
							<button>Reply</button>
							<SettingsButton
								className={classes.settingsButton}
								onClick={showSettingsHandler}
							/>
						</div>
					</div>
					<div
						className={`${classes.like} ${
							isUserLikingComment ? classes.liked : ''
						}`}
						onClick={likeCommentHandler}
					>
						{isUserLikingComment ? <FaHeart /> : <FaRegHeart />}
					</div>
				</div>
				{!(comment.answers.length > 0) && (
					<div className={classes.reply}>
						<IoRemoveOutline />{' '}
						<span>View replies ({comment.answers.length})</span>
					</div>
				)}
			</div>
			{isLikesModal && (
				<LikesModal
					onClose={closeLikesHandler}
					commentId={comment.id}
					userId={userId}
				/>
			)}
			{isSettingsModal && (
				<CommentSettings
					onClose={hideSettingsHandler}
					commentId={comment.id}
					isUserAuthor={isUserAuthor}
				/>
			)}
		</>
	);
};

export default Comment;
