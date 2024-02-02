import Link from 'next/link';
import classes from './PostTile.module.scss';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import { FaComment } from 'react-icons/fa';

interface PostTileProps {
	postId: string;
	hideLikesCount: boolean;
	archived: boolean;
	likes: string[] | [];
	comments: string[] | [];
	image: string;
	author: string;
}

const PostTile: React.FC<PostTileProps> = ({
	postId,
	hideLikesCount,
	archived,
	likes,
	comments,
	image,
	author,
}) => {
	return (
		<div className={classes.post}>
			<Link href={`/post/${postId}`}>
				<Image
					src={`https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${image}`}
					width={300}
					height={300}
					alt={`${author} post`}
				/>
				<div className={classes.shadow}>
					<div>
						<FaHeart /> <span>{likes.length}</span>
					</div>
					<div>
						<FaComment /> <span>{comments.length}</span>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default PostTile;
