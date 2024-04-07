import Image from 'next/image';
import classes from './StoryIcon.module.scss';
import Link from 'next/link';
interface StoryIconProps {
	user: {
		_id: string;
		image: string;
		imageType: string;
		name: string;
	};
	watched: boolean;
}

const StoryIcon: React.FC<StoryIconProps> = ({ user, watched }) => {
	return (
		<Link
			href={`/stories/${user._id}`}
			className={`${classes.icon} ${watched ? classes.watched : null}`}
		>
			<Image
				src={
					user.imageType === 'provider'
						? `${user.image}`
						: `https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${user.image}`
				}
				width={56}
				height={56}
				alt={`${user.name} Profile picture`}
			/>
		</Link>
	);
};

export default StoryIcon;
