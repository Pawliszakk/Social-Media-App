import { followUser, unFollowUser } from '@/lib/actions/user/followUser';
import { deleteFollowRequest } from '@/lib/actions/user/sendFollowRequest';
import ProfileActions from './ProfileActions';
import classes from './ProfileInfo.module.scss';
import LoggedUserImage from './LoggedUserImage';
import ProfileImage from '../UI/User/ProfileImage';
import ProfileBio from './ProfileBio';
interface ProfileInfoProps {
	name: string;
	profileId: string;
	image: string;
	bio: string;
	website: string;
	imageType: string;
	userId: string;
	posts: string[];
	followers: string[];
	following: string[];
	isLoggedUserProfile: boolean;
	isBlocked: boolean;
	isUserFollowingProfile: boolean;
	isCloseFriend: boolean;
	isProfilePrivate: boolean;
	followingStatus: any;
}

const ProfileInfo: React.FC<ProfileInfoProps> = (props) => {
	const followHandler = async () => {
		'use server';
		const res = await followUser(props.userId, props.profileId);
		return res;
	};
	const unFollowHandler = async () => {
		'use server';
		const res = await unFollowUser(props.userId, props.profileId);
		return res;
	};
	const deleteRequestHandler = async () => {
		'use server';
		const res = await deleteFollowRequest(props.userId, props.profileId);
		return res;
	};
	return (
		<div className={classes.box}>
			{props.isLoggedUserProfile ? (
				<LoggedUserImage
					image={props.image}
					name={props.name}
					imageType={props.imageType}
					userId={props.userId}
				/>
			) : (
				<ProfileImage
					image={props.image}
					name={props.name}
					imageType={props.imageType}
					profile
				/>
			)}

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
					deleteFollowRequest={deleteRequestHandler}
					profileId={props.profileId}
					followingStatus={props.followingStatus}
					userId={props.userId}
					isBlocked={props.isBlocked}
					isCloseFriend={props.isCloseFriend}
				/>

				<ProfileBio bio={props.bio} website={props.website} />
			</div>
		</div>
	);
};

export default ProfileInfo;
