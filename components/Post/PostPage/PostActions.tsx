import classes from './PostActions.module.scss';
import { FaRegHeart } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { CiSaveDown1 } from 'react-icons/ci';

interface PostActionsProps {}

const PostActions: React.FC<PostActionsProps> = () => {
	return (
		<div className={classes.actions}>
			<div>
				<FaRegHeart />
				<FiMessageCircle />
			</div>
			<div>
				<CiSaveDown1 />
			</div>
		</div>
	);
};

export default PostActions;
