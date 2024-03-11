'use client';
import classes from './PostActions.module.scss';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { useState } from 'react';
import { MdOutlineCollectionsBookmark } from 'react-icons/md';
import Link from 'next/link';
import { savePost } from '@/lib/actions/post/savePost';
interface PostActionsProps {
	postId: string;
	isUserLikingPost: boolean;
	isUserSavedPost: boolean;
	likePost: () => void;
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
				await savePost(props.postId);
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

				<Link href={`/post/${props.postId}`}>
					<FiMessageCircle />
				</Link>
			</div>
			<div className={isSaved ? classes.saved : ''}>
				<MdOutlineCollectionsBookmark onClick={handleSaveClick} />
			</div>
		</div>
	);
};

export default PostActions;
