import { followUser, unFollowUser } from '@/lib/actions/user/followUser';
import ProfileActions from './ProfileActions';
import classes from './ProfileInfo.module.scss';
import Image from 'next/image';

interface ProfileInfoProps {
	name: string;
	profileId: string;
	image: string;
	posts: string[];
	followers: string[];
	following: string[];
	isLoggedUserProfile: boolean;
	userId: string;
	isUserFollowingProfile: boolean;
}

const ProfileInfo: React.FC<ProfileInfoProps> = (props) => {
	const followHandler = async () => {
		'use server';
		followUser(props.userId, props.profileId);
	};
	const unFollowHandler = async () => {
		'use server';
		unFollowUser(props.userId, props.profileId);
	};

	return (
		<div className={classes.box}>
			<Image
				src={props.image}
				width={200}
				height={200}
				alt={`${props.name} Profile picture`}
			/>

			<div className={classes.info}>
				<ProfileActions
					name={props.name}
					isLoggedUserProfile={props.isLoggedUserProfile}
					isUserFollowingProfile={props.isUserFollowingProfile}
					followersLength={props.followers.length}
					followingLength={props.following.length}
					postsLength={props.posts.length}
					follow={followHandler}
					unFollow={unFollowHandler}
				/>
			</div>
		</div>
	);
};

export default ProfileInfo;
