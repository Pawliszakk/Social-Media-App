
import classes from './PostAddComment.module.scss';
import ProfileImage from '@/components/UI/User/ProfileImage';

interface PostAddCommentProps {
	image: string | null | undefined;
	imageType: string | null | undefined;
	name: string | null | undefined;
	userId: string | null | undefined;
}

const PostAddComment: React.FC<PostAddCommentProps> = (props) => {
	return (
		<div className={classes.add}>
			<ProfileImage
				image={props.image}
				name={props.name}
				imageType={props.imageType}
			/>
			<textarea name="addComment" id="" placeholder="add comment..."></textarea>
		</div>
	);
};

export default PostAddComment;
