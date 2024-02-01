import Image from 'next/image';
import classes from './Post.module.scss';
import { PiChatCircleTextThin } from 'react-icons/pi';
import { CiHeart } from 'react-icons/ci';
import { CiSaveDown1 } from 'react-icons/ci';
import Link from 'next/link';

interface PostProps {
	postId: string;
	description: string;
	image: string;
	commenting: boolean;
	archived: boolean;
	hideLikesCount: boolean;
	date: string;
	likes: string[] | [];
	comments: string[] | [];
	author: { id: string; name: string; image: string };
}

const Post: React.FC<PostProps> = async ({
	postId,
	description,
	image,
	commenting,
	archived,
	hideLikesCount,
	date,
	likes,
	comments,
	author,
}) => {
	return (
		<article className={classes.post}>
			<div className={classes.author}>
				<div className={classes.image}>
					<Image src={author.image} width={100} height={100} alt="user" />
					<Link href={`/profile/${author.id}`}>{author.name}</Link>{' '}
					<span>{date}</span>
				</div>
				<div>
					<button>...</button>
				</div>
			</div>
			<div className={classes.images}>
				<Image
					src={`https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${image}`}
					width={400}
					height={400}
					alt={`Post of ${author.name} user`}
				/>
			</div>
			<div className={classes.actions}>
				<div>
					<CiHeart />
					<PiChatCircleTextThin />
				</div>
				<div>
					<CiSaveDown1 />
				</div>
			</div>
			<div className={classes.likes}>
				<p>
					<span>{likes.length}</span> Likes
				</p>
			</div>

			<div className={classes.description}>
				<p>
					<Link href={`/profile/${author.id}`}>{author.name}</Link>{' '}
					{description}
				</p>
			</div>

			<div className={classes.comments}>
				<p>View all {comments.length} comments</p>
			</div>

			<div className={classes.addComment}>
				<form action="">
					<textarea
						name=""
						id=""
						// cols="30"
						// rows="1"
						placeholder="Add comment..."
					></textarea>
				</form>
			</div>
			<hr />
		</article>
	);
};

export default Post;
