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
	isUserFollowingAuthor: boolean;
	home?: boolean;
	isUserAuthor: boolean;
}

const PostAuthor: React.FC<PostAuthorProps> = ({
	image,
	name,
	description,
	authorId,
	date,
	isUserFollowingAuthor,
	home,
}) => {
	return (
		<>
			{' '}
			<div className={classes.author}>
				<Link href={`/profile/${authorId}`} className={classes.image}>
					{' '}
					<Image src={image} width={50} height={50} alt={`${name} avatar`} />
					<span>
						{name} {isUserFollowingAuthor ? 'Following' : 'Not Following'}
					</span>
					<span>{date}</span>
				</Link>
				<button className={classes.button}>
					<BsThreeDots />
				</button>
			</div>
			{!home && description !== '' ? (
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
