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

const PostAuthor: React.FC<PostAuthorProps> = (props) => {
	return (
		<div className={classes.author}>
			<Link href={`/profile/${props.authorId}`} className={classes.image}>
				<Image
					src={props.image}
					width={50}
					height={50}
					alt={`${props.name} avatar`}
				/>
				<span>
					{props.name}{' '}
					{props.isUserFollowingAuthor ? 'Following' : 'Not Following'}
				</span>
				<span>{props.date}</span>
			</Link>
			<button className={classes.button}>
				<BsThreeDots />
			</button>
		</div>
	);
};

export default PostAuthor;
