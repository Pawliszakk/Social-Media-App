'use client';
import classes from './PostActions.module.scss';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { useState } from 'react';
import { MdOutlineCollectionsBookmark } from 'react-icons/md';
interface PostActionsProps {
	userId: string;
	postId: string;
	isUserLikingPost: boolean;
	isUserSavedPost: boolean;
	likePost: () => void;
	savePost: (postId: string, userId: string) => void;
}

const PostActions: React.FC<PostActionsProps> = (props) => {
	const [isSaved, setIsSaved] = useState(props.isUserSavedPost);

	const [isSavingDisabled, setIsSavingDisabled] = useState(false);

	const handleLikeClick = () => {
		props.likePost();
	};

	const handleSaveClick = async () => {
		try {
			if (!isSavingDisabled) {
				setIsSavingDisabled(true);
				setIsSaved((prev) => !prev);
				await props.savePost(props.postId, props.userId);
				setIsSavingDisabled(false);
			}
		} catch (error) {
			setIsSavingDisabled(false);
		}
	};

	return (
		<div className={classes.actions}>
			<div>
				<div
					className={props.isUserLikingPost ? classes.liked : ''}
					onClick={handleLikeClick}
				>
					{props.isUserLikingPost ? <FaHeart /> : <FaRegHeart />}
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
