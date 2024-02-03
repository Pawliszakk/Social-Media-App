'use client';
import classes from './PostActions.module.scss';
import { FaRegHeart } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { CiSaveDown1 } from 'react-icons/ci';

interface PostActionsProps {
	likePost: () => void;
	savePost: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({ likePost, savePost }) => {
	return (
		<div className={classes.actions}>
			<div>
				<FaRegHeart onClick={() => likePost()} />
				<FiMessageCircle />
			</div>
			<div>
				<CiSaveDown1 onClick={() => savePost()} />
			</div>
		</div>
	);
};

export default PostActions;
