import Image from 'next/image';
import classes from './PostAddComment.module.scss';

interface PostAddCommentProps {
	image: string | null | undefined;
	name: string | null | undefined;
	userId: string | null | undefined;
}

const PostAddComment: React.FC<PostAddCommentProps> = ({
	image,
	name,
	userId,
}) => {
	return (
		<div className={classes.add}>
			<Image src={`${image}`} width={50} height={50} alt={`${name} avatar`} />
			<textarea name="addComment" id="" placeholder="add comment..."></textarea>
		</div>
	);
};

export default PostAddComment;
