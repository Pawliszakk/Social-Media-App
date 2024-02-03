import Image from 'next/image';
import classes from './PostAuthor.module.scss';
import Link from 'next/link';
import { BsThreeDots } from 'react-icons/bs';
interface PostAuthorProps {
	image: string;
	name: string;
	description: string;
	date: string;
	authorId: string;
	isFollowingAuthor: boolean;
}

const PostAuthor: React.FC<PostAuthorProps> = ({
	image,
	name,
	description,
	authorId,
	date,
	isFollowingAuthor,
}) => {
	return (
		<>
			{' '}
			<div className={classes.author}>
				<Link href={`/profile/${authorId}`} className={classes.image}>
					{' '}
					<Image src={image} width={50} height={50} alt={`${name} avatar`} />
					<span>
						{name} {isFollowingAuthor ? 'Followuje' : 'Nie followuje'}
					</span>
				</Link>
				<button className={classes.button}>
					<BsThreeDots />
				</button>
			</div>
			{description !== '' ? (
				<>
					{' '}
					<div className={classes.description}>
						<Image
							src={image}
							width={50}
							height={50}
							alt={`Profile picture of ${name}`}
						/>
						<p>
							<Link href={`/profile/${authorId}`}></Link>description
						</p>
					</div>
				</>
			) : null}
		</>
	);
};

export default PostAuthor;
