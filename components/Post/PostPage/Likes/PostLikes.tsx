import { transformPostDate } from '@/lib/helpers/transformPostDate';
import classes from './PostLikes.module.scss';
import { useState } from 'react';
import LikesModal from './LikesModal';

interface PostLikesProps {
	postId: string;
	userId: string;
	date: number;
	likes: number;
	showLikes: boolean;
	isUserAuthor: boolean;
}

const PostLikes: React.FC<PostLikesProps> = (props) => {
	const [isLikesModal, setIsLikesModal] = useState(false);
	const showModalHandler = () => setIsLikesModal(true);
	const closeModalHandler = () => setIsLikesModal(false);

	const dateToDisplay = transformPostDate(props.date);
	return (
		<div className={classes.likes}>
			{props.isUserAuthor || (!props.isUserAuthor && props.showLikes) ? (
				<p className={classes.likeParagraph} onClick={showModalHandler}>
					<span>{props.likes}</span> Likes
				</p>
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
