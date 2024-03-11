import Link from 'next/link';
import classes from './PostTile.module.scss';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import { FaComment } from 'react-icons/fa';

interface PostTileProps {
	post: {
		id: string;
		likes: string[] | [];
		comments: string[] | [];
		image: string;
		author: string;
		commenting: boolean;
		hideLikesCount: boolean;
	};
	isUserAuthor: boolean;
	showLikes: boolean;
}

const PostTile: React.FC<PostTileProps> = ({
	post,
	isUserAuthor,
	showLikes,
}) => {
	return (
		<div className={classes.tile}>
			<Link href={`/post/${post.id}`}>
				<Image
					src={`https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${post.image}`}
					width={300}
					height={300}
					alt={`${post.author} post`}
				/>
				{!post.hideLikesCount && (
					<div className={classes.shadow}>
						{isUserAuthor || (!isUserAuthor && showLikes) ? (
							<div>
								<FaHeart /> <span>{post.likes.length}</span>
							</div>
						) : null}
						{post.commenting && (
							<div>
								<FaComment /> <span>{post.comments.length}</span>
							</div>
						)}
					</div>
				)}
			</Link>
		</div>
	);
};
export default PostTile;
