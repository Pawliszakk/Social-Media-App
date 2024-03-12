import classes from './layout.module.scss';
import PostsLinks from '@/components/Profile/Posts/PostsLinks';
import { getProfileData } from '@/lib/actions/utils/profile/getProfileData';
import ProfileActions from '@/components/Profile/ProfileActions';
import LoggedUserImage from '@/components/Profile/LoggedUserImage';
import ProfileImage from '@/components/UI/User/ProfileImage';
import { deleteFollowRequest } from '@/lib/actions/user/sendFollowRequest';
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

	const deleteRequestHandler = async () => {
		'use server';
		const res = await deleteFollowRequest(userId, profileId);
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
						deleteFollowRequest={deleteRequestHandler}
						profileId={profile.id}
						followingStatus={followingStatus}
						userId={userId}
						isBlocked={isUserBlockingProfile}
						isCloseFriend={isProfileCloseFriend}
						isPrivate={profile.private}
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
