import Image from 'next/image';
import classes from './Reply.module.scss';
import Link from 'next/link';
import { transformPostDate } from '@/lib/helpers/transformPostDate';
import SettingsButton from '@/components/UI/Settings/SettingsButton';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import CommentSettings from './CommentSettings';
import LikesModal from './LikesModal';

interface ReplyProps {
	userId: string;
	reply: {
		id: string;
		isUserLikingReply: boolean;
		date: string;
		content: string;
		likes: string[] | [];
		author: {
			name: string;
			id: string;
			image: string;
			imageType: string;
		};
	};
}
const Reply: React.FC<ReplyProps> = ({ reply, userId }) => {
	const [isLikesModal, setIsLikesModal] = useState(false);
	const [likes, setLikes] = useState(reply.likes.length);
	const [isUserLikingReply, setIsUserLikingReply] = useState(
		reply.isUserLikingReply
	);
	const [isSettingsModal, setIsSettingsModal] = useState(false);

	const closeLikesHandler = () => setIsLikesModal(false);

	const showSettingsHandler = () => setIsSettingsModal(true);
	const hideSettingsHandler = () => setIsSettingsModal(false);
	const isUserAuthor = reply.author.id === userId;

	const doubleClickHandler = () => {
		if (isUserLikingReply) {
			console.log('unlikeReply');
		} else {
			console.log('likeReply');
		}
	};
	const showLikesHandler = () => {
		console.log('showLikes');
	};
	const likeReplyHandler = async () => {
		if (isUserLikingReply) {
			setLikes((prev) => prev - 1);
			setIsUserLikingReply(false);
			console.log('unlike comment');
		} else {
			setLikes((prev) => prev + 1);
			setIsUserLikingReply(true);
			console.log('like comment');
		}
	};

	const transformedDate = transformPostDate(+reply.date);
	return (
		<>
			<div className={classes.box} onDoubleClick={doubleClickHandler}>
				<div className={classes.image}>
					<Image
						src={
							reply.author.imageType === 'provider'
								? `${reply.author.image}`
								: `https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${reply.author.image}`
						}
						height={30}
						width={30}
						alt={`${reply.author.name} profile image`}
					/>
				</div>
				<div className={classes.reply}>
					<div className={classes.content}>
						<Link href="/">{reply.author.name}</Link>
						<p>{reply.content}</p>
					</div>
					<div className={classes.actions}>
						<span suppressHydrationWarning={true} className={classes.date}>
							{transformedDate}
						</span>
						<span
							onClick={showLikesHandler}
							className={`${likes === 0 ? classes.empty : null}`}
						>
							{reply.likes.length} {reply.likes.length === 1 ? 'like' : 'likes'}
						</span>
						{/* <button onClick={ReplyHandler}>Reply</button> */}
						<SettingsButton
							className={classes.settingsButton}
							onClick={showSettingsHandler}
						/>
					</div>
				</div>
				<div
					className={`${classes.like} ${
						reply.isUserLikingReply ? classes.liked : ''
					}`}
					onClick={likeReplyHandler}
				>
					{reply.isUserLikingReply ? <FaHeart /> : <FaRegHeart />}
				</div>
			</div>
			{isLikesModal && (
				<LikesModal
					onClose={closeLikesHandler}
					replyId={reply.id}
					userId={userId}
				/>
			)}
			{isSettingsModal && (
				<CommentSettings
					onClose={hideSettingsHandler}
					replyId={reply.id}
					isUserAuthor={isUserAuthor}
				/>
			)}
		</>
	);
};

export default Reply;
