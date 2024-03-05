import classes from './layout.module.scss';
import PostsLinks from '@/components/Profile/Posts/PostsLinks';
import { getProfileData } from '@/lib/actions/utils/profile/getProfileData';
import ProfileActions from '@/components/Profile/ProfileActions';
import LoggedUserImage from '@/components/Profile/LoggedUserImage';
import ProfileImage from '@/components/UI/User/ProfileImage';
import { followUser, unFollowUser } from '@/lib/actions/user/followUser';
import { deleteFollowRequest } from '@/lib/actions/user/sendFollowRequest';
import { unBlockUser } from '@/lib/actions/user/blockUser';
import ProfileBio from '@/components/Profile/ProfileBio';

export default async function RootLayout({
	children,
	params,
}: {
	params: { profileId: string };
	children: React.ReactNode;
}) {
	const { profileId } = params;
	const {
		userId,
		profile,
		isLoggedUserProfile,
		isUserFollowingProfile,
		followingStatus,
		isUserBlockingProfile,
		isProfileCloseFriend,
	} = await getProfileData(profileId);

	const followHandler = async () => {
		'use server';
		const res = await followUser(userId, profileId);
		return res;
	};
	const unFollowHandler = async () => {
		'use server';
		const res = await unFollowUser(userId, profileId);
		return res;
	};
	const deleteRequestHandler = async () => {
		'use server';
		const res = await deleteFollowRequest(userId, profileId);
		return res;
	};
	const unBlockHandler = async () => {
		'use server';
		const res = await unBlockUser(userId, profileId);
		return res;
	};

	return (
		<div className={classes.box}>
			<div className={classes.profile}>
				{isLoggedUserProfile ? (
					<LoggedUserImage
						image={profile.image}
						name={profile.name}
						imageType={profile.imageType}
						userId={profile.userId}
					/>
				) : (
					<ProfileImage
						image={profile.image}
						name={profile.name}
						imageType={profile.imageType}
						profile
					/>
				)}

				<div className={classes.info}>
					<ProfileActions
						name={profile.name}
						isLoggedUserProfile={isLoggedUserProfile}
						isUserFollowingProfile={!!isUserFollowingProfile}
						followersLength={profile.followers.length}
						followingLength={profile.following.length}
						postsLength={profile.posts.length}
						follow={followHandler}
						unFollow={unFollowHandler}
						unBlock={unBlockHandler}
						deleteFollowRequest={deleteRequestHandler}
						profileId={profile.id}
						followingStatus={followingStatus}
						userId={userId}
						isBlocked={isUserBlockingProfile}
						isCloseFriend={isProfileCloseFriend}
					/>

					<ProfileBio bio={profile.bio} website={profile.website} />
				</div>
			</div>

			<div className={classes.divider}></div>

			{isLoggedUserProfile && <PostsLinks profileId={profile.id} />}
			{children}
		</div>
	);
}
