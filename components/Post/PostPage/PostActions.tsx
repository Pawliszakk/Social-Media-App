'use client';
import classes from './PostActions.module.scss';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { useState } from 'react';
import { MdOutlineCollectionsBookmark } from 'react-icons/md';
interface PostActionsProps {
	likePost: (postId: string, userId: string) => void;
	savePost: (postId: string, userId: string) => void;
	userId: string;
	postId: string;
	isUserLikingPost: boolean;
	isUserSavedPost: boolean;
}

const PostActions: React.FC<PostActionsProps> = ({
	likePost,
	savePost,
	postId,
	userId,
	isUserLikingPost,
	isUserSavedPost,
}) => {
	const [isLiked, setIsLiked] = useState(isUserLikingPost);
	const [isSaved, setIsSaved] = useState(isUserSavedPost);

	const [isLikingDisabled, setIsLikingDisabled] = useState(false);
	const [isSavingDisabled, setIsSavingDisabled] = useState(false);

	const handleLikeClick = async () => {
		try {
			if (!isLikingDisabled) {
				setIsLikingDisabled(true);
				setIsLiked((prev) => !prev);
				await likePost(postId, userId);
				setIsLikingDisabled(false);
			}
		} catch (error) {
			setIsLikingDisabled(false);
		}
	};
	const handleSaveClick = async () => {
		try {
			if (!isSavingDisabled) {
				setIsSavingDisabled(true);
				setIsSaved((prev) => !prev);
				await savePost(postId, userId);
				setIsSavingDisabled(false);
			}
		} catch (error) {
			setIsSavingDisabled(false);
		}
	};

	return (
		<div className={classes.actions}>
			<div>
				<div className={isLiked ? classes.liked : ''} onClick={handleLikeClick}>
					{isLiked ? <FaHeart /> : <FaRegHeart />}
				</div>

				<FiMessageCircle />
			</div>
			<div className={isSaved ? classes.saved : ''}>
				<MdOutlineCollectionsBookmark onClick={handleSaveClick} />
			</div>
		</div>
	);
};

export default PostActions;
