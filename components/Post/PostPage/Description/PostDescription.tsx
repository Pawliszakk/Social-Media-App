import Image from 'next/image';
import classes from './PostDescription.module.scss';
import Link from 'next/link';
import ProfileImage from '@/components/UI/User/ProfileImage';

interface PostDescriptionProps {
	image?: string;
	imageType?: string;
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
							<ProfileImage
								image={props.image}
								imageType={props.imageType}
								name={props.authorName}
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
