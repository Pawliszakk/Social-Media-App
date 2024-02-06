import Image from 'next/image';
import classes from './PostAuthor.module.scss';
import Link from 'next/link';

interface PostAuthorProps {
	image: string;
	name: string;
	date: string;
	authorId: string;
	isUserFollowingAuthor: boolean;
	children: React.ReactNode;
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
			{props.children}
		</div>
	);
};

export default PostAuthor;
