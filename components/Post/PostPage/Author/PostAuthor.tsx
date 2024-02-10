import Image from 'next/image';
import classes from './PostAuthor.module.scss';
import Link from 'next/link';
import FollowSpan from './FollowSpan';
import { followUser, unFollowUser } from '@/lib/actions/user/followUser';

interface PostAuthorProps {
	image: string;
	name: string;
	date: string;
	authorId: string;
	userId: string;
	isUserFollowingAuthor: boolean;
	isUserAuthor: boolean;
	children: React.ReactNode;
}

const PostAuthor: React.FC<PostAuthorProps> = (props) => {
	const handleFollow = async () => {
		'use server';
		followUser(props.userId, props.authorId);
	};
	const handleUnFollow = async () => {
		'use server';
		unFollowUser(props.userId, props.authorId);
	};

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
					<FollowSpan
						follow={handleFollow}
						unFollow={handleUnFollow}
						isUserFollowingAuthor={props.isUserFollowingAuthor}
					/>
				)}
				<span>{props.date}</span>
			</div>
			{props.children}
		</div>
	);
};

export default PostAuthor;
