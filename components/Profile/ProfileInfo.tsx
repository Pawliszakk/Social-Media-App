import { followUser, unFollowUser } from '@/lib/actions/user/followUser';
import { deleteFollowRequest } from '@/lib/actions/user/sendFollowRequest';
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
					deleteFollowRequest={deleteRequestHandler}
					profileId={props.profileId}
					followingStatus={props.followingStatus}
				/>
			</div>
		</div>
	);
};

export default ProfileInfo;
