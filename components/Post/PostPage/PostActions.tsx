'use client';
import classes from './PostActions.module.scss';
import { FaRegHeart } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { CiSaveDown1 } from 'react-icons/ci';
import { useState } from 'react';
import { motion } from 'framer-motion';
interface PostActionsProps {
	likePost: (postId: string, userId: string) => void;
	savePost: () => void;
	userId: string;
	postId: string;
	isUserLikingPost: boolean;
}

const PostActions: React.FC<PostActionsProps> = ({
	likePost,
	savePost,
	postId,
	userId,
	isUserLikingPost,
}) => {
	const [isLiked, setIsLiked] = useState(isUserLikingPost);

	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	const handleLikeClick = async () => {
		try {
			if (!isButtonDisabled) {
				setIsButtonDisabled(true);

				setIsLiked((prev) => !prev);
				await likePost(postId, userId);

				setIsButtonDisabled(false);
			}
		} catch (error) {
			setIsButtonDisabled(false);
		}
	};

	return (
		<div className={classes.actions}>
			<div>
				<motion.div
					className={isLiked ? classes.liked : ''}
					onClick={handleLikeClick}
				>
					<FaRegHeart />
				</motion.div>

				<FiMessageCircle />
			</div>
			<div>
				<CiSaveDown1 onClick={() => savePost()} />
			</div>
		</div>
	);
};

export default PostActions;
