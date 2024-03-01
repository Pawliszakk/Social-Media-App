import classes from './ProfileBio.module.scss';
import { FiLink } from 'react-icons/fi';
interface ProfileBioProps {
	bio: string;
	website?: string;
}

const ProfileBio: React.FC<ProfileBioProps> = ({ bio, website }) => {
	return (
		<div className={classes.bio}>
			<p>{bio}</p>
			{website && (
				<a href={website} target="_blank">
					<FiLink />
					{website?.split('/')[2]}
				</a>
			)}
		</div>
	);
};

export default ProfileBio;
