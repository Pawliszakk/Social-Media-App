import { transformPostDate } from '@/lib/helpers/transformPostDate';
import classes from './PostLikes.module.scss';
import { useState } from 'react';
import LikesModal from './LikesModal';
import ProfileImage from '@/components/UI/User/ProfileImage';
import Link from 'next/link';

interface PostLikesProps {
	postId: string;
	userId: string;
	date: number;
	likes: number;
	showLikes: boolean;
	isUserAuthor: boolean;
	hideLikesCount: boolean;
	likesSnippet: {
		name: string;
		id: string;
		image: string;
		imageType: string;
	}[];
}

const PostLikes: React.FC<PostLikesProps> = (props) => {
	const [isLikesModal, setIsLikesModal] = useState(false);
	const showModalHandler = () => {
		if (props.likes > 0) {
			setIsLikesModal(true);
		}
	};
	const closeModalHandler = () => setIsLikesModal(false);
	const dateToDisplay = transformPostDate(props.date);
	return (
		<div className={classes.likes}>
			{props.isUserAuthor || (!props.isUserAuthor && props.showLikes) ? (
				props.likes >= 3 && props.likesSnippet ? (
					<div className={classes.images}>
						{props.likesSnippet!.map((user: any) => (
							<ProfileImage
								image={user.image}
								imageType={user.imageType}
								name={user.name}
								key={user.id}
								profileId={user.id}
							/>
						))}
						<p>
							Liked by{' '}
							<Link href={`/profile/${props.likesSnippet[0].id}`}>
								{props.likesSnippet[0].name}
							</Link>{' '}
							and{' '}
							<span onClick={showModalHandler}>
								{props.hideLikesCount ? '' : props.likes - 1} others
							</span>
						</p>
					</div>
				) : (
					<p
						className={`${classes.likeParagraph} ${
							props.likes === 0 ? classes.emptyLikes : null
						}`}
						onClick={showModalHandler}
					>
						<span>{props.likes}</span> {props.likes === 1 ? 'like' : 'likes'}
					</p>
				)
			) : (
				<p>Likes count hidden on your account</p>
			)}

			<p suppressHydrationWarning={true} className={classes.date}>
				{dateToDisplay}
			</p>
			{isLikesModal && (
				<LikesModal
					userId={props.userId}
					onClose={closeModalHandler}
					postId={props.postId}
				/>
			)}
		</div>
	);
};

export default PostLikes;
