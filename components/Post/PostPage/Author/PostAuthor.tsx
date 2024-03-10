'use client';
import classes from './PostAuthor.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import Spinner from '@/components/UI/Spinner';
import ProfileImage from '@/components/UI/User/ProfileImage';
import { transformPostDate } from '@/lib/helpers/transformPostDate';
import { followUser, unFollowUser } from '@/lib/actions/user/followUser';

interface PostAuthorProps {
	children: React.ReactNode;
	image: string;
	imageType: string;
	name: string;
	date: number;
	authorId: string;
	userId: string;
	isUserAuthor: boolean;
	isUserFollowingAuthor: boolean;
}

const PostAuthor: React.FC<PostAuthorProps> = (props) => {
	const [isLoading, setIsLoading] = useState(false);

	const spanClickHandler = async () => {
		setIsLoading(true);
		if (props.isUserFollowingAuthor) {
			await unFollowUser(props.authorId);
		} else {
			await followUser(props.authorId);
		}
		setIsLoading(false);
	};
	return (
		<div className={classes.author}>
			<div className={classes.user}>
				<ProfileImage
					userId={props.userId}
					image={props.image}
					name={props.name}
					imageType={props.imageType}
					profileId={props.authorId}
					isUserFollowingProfile={props.isUserFollowingAuthor}
					isUserAuthor={props.isUserAuthor}
					snippet
				/>
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
				<span className={classes.date} suppressHydrationWarning={true}>
					• {transformPostDate(props.date)}
				</span>
			</div>
			{props.children}
		</div>
	);
};

export default PostAuthor;
