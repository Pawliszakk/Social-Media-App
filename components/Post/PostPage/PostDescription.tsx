import Image from 'next/image';
import classes from './PostDescription.module.scss';
import Link from 'next/link';

interface PostDescriptionProps {
	image?: string;
	authorName: string;
	authorId: string;
	description: string;
	home?: boolean;
}

const PostDescription: React.FC<PostDescriptionProps> = (props) => {
	return (
		<>
			{props.description !== '' && (
				<div
					className={`${classes.description} ${
						props.home ? '' : classes.postPage
					}`}
				>
					{!props.home && (
						<Link href={`/profile/${props.authorId}`}>
							<Image
								src={`${props.image}`}
								width={50}
								height={50}
								alt={`${props.authorName} profile picture`}
							/>
						</Link>
					)}
					<p>
						<Link href={`/profile/${props.authorId}`}>{props.authorName}</Link>{' '}
						description
					</p>
				</div>
			)}
		</>
	);
};

export default PostDescription;
