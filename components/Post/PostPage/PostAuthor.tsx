import Image from 'next/image';
import classes from './PostAuthor.module.scss';
import Link from 'next/link';
import { BsThreeDots } from 'react-icons/bs';
interface PostAuthorProps {
	image: string;
	name: string;
	date: string;
	authorId: string;
	isUserFollowingAuthor: boolean;
	isUserAuthor: boolean;
}

const PostAuthor: React.FC<PostAuthorProps> = ({
	image,
	name,
	authorId,
	date,
	isUserFollowingAuthor,
}) => {
	return (
		<div className={classes.author}>
			<Link href={`/profile/${authorId}`} className={classes.image}>
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
	);
};

export default PostAuthor;
