import Image from 'next/image';
import classes from './PostAuthor.module.scss';
import Link from 'next/link';

interface PostAuthorProps {
	image: string;
	name: string;
	date: string;
	authorId: string;
	isUserFollowingAuthor: boolean;
	isUserAuthor: boolean;
	children: React.ReactNode;
}

const PostAuthor: React.FC<PostAuthorProps> = (props) => {
	return (
		<div className={classes.author}>
			<div className={classes.user}>
				<Link href={`/profile/${props.authorId}`} className={classes.image}>
					<Image
						src={props.image}
						width={50}
						height={50}
						alt={`${props.name} avatar`}
					/>
				</Link>
				<Link href={`/profile/${props.authorId}`}>
					<span>{props.name}</span>
				</Link>
				{!props.isUserAuthor && (
					<span>{props.isUserFollowingAuthor ? 'Unfollow' : 'Follow'} </span>
				)}
				<span>{props.date}</span>
			</div>
			{props.children}
		</div>
	);
};

export default PostAuthor;
