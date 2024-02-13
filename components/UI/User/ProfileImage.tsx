import Image from 'next/image';
import classes from './ProfileImage.module.scss';
interface ProfileImageProps {
	image: string | null | undefined;
	imageType: string | null | undefined;
	name: string | null | undefined;
	profile?: boolean;
}

const ProfileImage: React.FC<ProfileImageProps> = (props) => {
	let size = 50;

	if (props.profile) {
		size = 200;
	}
	return (
		<Image
			className={classes.image}
			src={
				props.imageType === 'provider'
					? `${props.image}`
					: `https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${props.image}`
			}
			width={size}
			height={size}
			alt={`${props.name} Profile picture`}
		/>
	);
};

export default ProfileImage;
