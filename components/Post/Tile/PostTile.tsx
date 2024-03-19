import Link from 'next/link';
import classes from './PostTile.module.scss';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import { FaComment } from 'react-icons/fa';

interface PostTileProps {
	postId: string;
	likes: string[] | [];
	comments: number;
	image: string;
	author: string;
	commenting: boolean;
	hideLikesCount: boolean;
	isUserAuthor: boolean;
	showLikes: boolean;
}

const PostTile: React.FC<PostTileProps> = ({
	postId,
	likes,
	comments,
	image,
	author,
	commenting,
	hideLikesCount,
	isUserAuthor,
	showLikes,
}) => {
	return (
		<div className={classes.tile}>
			<Link href={`/post/${postId}`}>
				<Image
					src={`https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${image}`}
					width={300}
					height={300}
					alt={`${author} post`}
				/>
				{!hideLikesCount && (
					<div className={classes.shadow}>
						{isUserAuthor || (!isUserAuthor && showLikes) ? (
							<div>
								<FaHeart /> <span>{likes.length}</span>
							</div>
						) : null}
						{commenting && (
							<div>
								<FaComment /> <span>{comments}</span>
							</div>
						)}
					</div>
				)}
			</Link>
		</div>
	);
};
export default PostTile;
