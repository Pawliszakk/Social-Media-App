import Image from 'next/image';
import classes from './PostDescription.module.scss';
import Link from 'next/link';
import ProfileImage from '@/components/UI/User/ProfileImage';

interface PostDescriptionProps {
	author: {
		image?: string;
		imageType?: string;
		name: string;
		id: string;
	};
	description: string;
	home?: boolean;
}

const PostDescription: React.FC<PostDescriptionProps> = (props) => {
	const { author } = props;
	return (
		<>
			{props.description !== '' && (
				<div
					className={`${classes.description} ${
						props.home ? '' : classes.postPage
					}`}
				>
					{!props.home && (
						<Link href={`/profile/${author.id}`}>
							<ProfileImage
								image={author.image}
								imageType={author.imageType}
								name={author.name}
							/>
						</Link>
					)}
					<p>
						<Link href={`/profile/${author.id}`}>{author.name}</Link>{' '}
						{props.description}
					</p>
				</div>
			)}
		</>
	);
};

export default PostDescription;
