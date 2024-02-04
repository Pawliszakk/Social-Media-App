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

const PostDescription: React.FC<PostDescriptionProps> = ({
	image,
	authorName,
	authorId,
	description,
	home,
}) => {
	return (
		<>
			{description !== '' && (
				<div
					className={`${classes.description} ${home ? '' : classes.postPage}`}
				>
					{!home && (
						<Link href={`/profile/${authorId}`}>
							<Image
								src={`${image}`}
								width={50}
								height={50}
								alt={`${authorName} profile picture`}
							/>
						</Link>
					)}
					<p>
						<Link href={`/profile/${authorId}`}>{authorName}</Link> description
					</p>
				</div>
			)}
		</>
	);
};

export default PostDescription;
