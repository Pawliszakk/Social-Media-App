import classes from './Comment.module.scss';
import { FaRegHeart } from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';
import { transformPostDate } from '@/lib/helpers/transformPostDate';
import { useState } from 'react';
import LikesModal from './LikesModal';
interface CommentProps {
	userId: string;
	comment: {
		id: string;
		author: {
			name: string;
			id: string;
			image: string;
			imageType: string;
		};
		content: string;
		date: string;
		answers: string[];
		likes: number;
	};
}

const Comment: React.FC<CommentProps> = ({ comment, userId }) => {
	const [isLikesModal, setIsLikesModal] = useState(false);

	const showLikesHandler = () => setIsLikesModal(true);
	const closeLikesHandler = () => setIsLikesModal(false);

	const transformedDate = transformPostDate(+comment.date);

	return (
		<>
			{' '}
			<div className={classes.box}>
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
						<span className={classes.date}>{transformedDate}</span>
						<span onClick={showLikesHandler}>
							{comment.likes} {comment.likes === 1 ? 'like' : 'likes'}
						</span>
						<button>Reply</button>
					</div>
				</div>
				<div className={classes.like}>
					<FaRegHeart />
				</div>
			</div>
			{isLikesModal && (
				<LikesModal
					onClose={closeLikesHandler}
					commentId={comment.id}
					userId={userId}
				/>
			)}
		</>
	);
};

export default Comment;
