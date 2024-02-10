'use client';
import Image from 'next/image';
import classes from './PostAuthor.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import Spinner from '@/components/UI/Spinner';

interface PostAuthorProps {
	image: string;
	name: string;
	date: string;
	authorId: string;
	followUser: (userId: string, userToFollow: string) => void;
	unFollowUser: (userId: string, userToFollow: string) => void;
	userId: string;
	isUserFollowingAuthor: boolean;
	isUserAuthor: boolean;
	children: React.ReactNode;
}

const PostAuthor: React.FC<PostAuthorProps> = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const spanClickHandler = async () => {
		setIsLoading(true);
		if (props.isUserFollowingAuthor) {
			await props.unFollowUser(props.userId, props.authorId);
		} else {
			await props.followUser(props.userId, props.authorId);
		}
		setIsLoading(false);
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
					<span onClick={spanClickHandler} className={classes.followSpan}>
						{isLoading ? (
							<Spinner />
						) : props.isUserFollowingAuthor ? (
							'Following'
						) : (
							'Follow'
						)}
					</span>
				)}
				<span>{props.date}</span>
			</div>
			{props.children}
		</div>
	);
};

export default PostAuthor;
