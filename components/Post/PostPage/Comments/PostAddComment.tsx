import classes from './PostAddComment.module.scss';
import ProfileImage from '@/components/UI/User/ProfileImage';

interface PostAddCommentProps {
	user: {
		image: string;
		imageType: string;
		name: string;
		id: string;
	};
}

const PostAddComment: React.FC<PostAddCommentProps> = ({ user }) => {
	return (
		<div className={classes.add}>
			<ProfileImage
				image={user.image}
				name={user.name}
				imageType={user.imageType}
			/>
			<textarea name="addComment" id="" placeholder="add comment..."></textarea>
		</div>
	);
};

export default PostAddComment;
