import Image from 'next/image';
import classes from './PostAuthor.module.scss';
import Link from 'next/link';
import PostSettings from './PostSettings';
import { deletePost } from '@/lib/actions/post/deletePost';

interface PostAuthorProps {
	image: string;
	name: string;
	date: string;
	authorId: string;
	isUserFollowingAuthor: boolean;
	isUserAuthor: boolean;
	postId: string;
	userId: string;
}

const PostAuthor: React.FC<PostAuthorProps> = (props) => {



	

	return (
		<div className={classes.author}>
			<Link href={`/profile/${props.authorId}`} className={classes.image}>
				<Image
					src={props.image}
					width={50}
					height={50}
					alt={`${props.name} avatar`}
				/>
				<span>
					{props.name}{' '}
					{props.isUserFollowingAuthor ? 'Following' : 'Not Following'}
				</span>
				<span>{props.date}</span>
			</Link>
			<PostSettings
				isUserAuthor={props.isUserAuthor}
				isUserFollowingAuthor={props.isUserFollowingAuthor}
				deletePost={deletePost}
				postId={props.postId}
				userId={props.userId}
			/>
		</div>
	);
};

export default PostAuthor;
