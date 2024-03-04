import ProfileInfo from '@/components/Profile/ProfileInfo';
import getLoggedUserProfile from '@/lib/actions/user/getLoggedUserProfile';
import { getProfile } from '@/lib/actions/user/getProfile';
import {
	BLOCKING,
	FOLLOWING,
	NOTFOLLOWING,
	REQUESTED,
} from '@/lib/constants/followingStatus';
import classes from './layout.module.scss';
import PostsLinks from '@/components/Profile/Posts/PostsLinks';
import { permanentRedirect } from 'next/navigation';
import { getUserData } from '@/lib/actions/utils/getUserData';

export default async function RootLayout({
	children,
	params,
}: {
	params: { profileId: string };
	children: React.ReactNode;
}) {
	const { session, user } = await getUserData(
		'blockedUsers',
		'sentFollowRequests',
		'closeFriends'
	);

	const { profileId } = params;

	const isLoggedUserProfile = profileId === user?.id;

	let profile: any;

	if (isLoggedUserProfile) {
		if (!session) {
			throw new Error('Authorization failed');
		}

		profile = await getLoggedUserProfile(profileId);
	} else {
		profile = await getProfile(profileId);
	}
	if (!profile) {
		throw new Error('Sorry, that site is unreachable');
	}
	const isUserFollowingProfile = profile.followers.find(
		(id: string) => user!.userId
	);
	const isUserBlockingProfile = user.blockedUsers.find(
		(id: string) => id.toString() === profile.id
	);

	const isUserBlockedByProfile = profile.blockedUsers.find(
		(id: string) => id.toString() === user!.userId
	);

	if (isUserBlockedByProfile && !isLoggedUserProfile) {
		permanentRedirect('/');
	}

	const isProfileRequestedToFollow = user.sentFollowRequests.find(
		(el: any) => el.reciever.toString() === profile.id
	);

	const isProfileCloseFriend = user.closeFriends.find(
		(id: string) => id.toString() === profile.id
	);

	let followingStatus;
	if (isUserFollowingProfile) {
		followingStatus = FOLLOWING;
	}
	if (!isUserFollowingProfile) {
		followingStatus = NOTFOLLOWING;
	}
	if (!!isProfileRequestedToFollow) {
		followingStatus = REQUESTED;
	}
	if (isUserBlockingProfile) {
		followingStatus = BLOCKING;
	}

	return (
		<div className={classes.box}>
			<ProfileInfo
				name={profile.name}
				image={profile.image}
				posts={profile.posts}
				followers={profile.followers}
				following={profile.following}
				profileId={profile._id.toString()}
				isLoggedUserProfile={isLoggedUserProfile}
				isUserFollowingProfile={!!isUserFollowingProfile}
				userId={user.id}
				isProfilePrivate={profile.private}
				followingStatus={followingStatus}
				imageType={profile.imageType}
				isBlocked={!!isUserBlockingProfile}
				isCloseFriend={!!isProfileCloseFriend}
				bio={profile.bio}
				website={profile.website}
			/>

			<div className={classes.divider}></div>

			{isLoggedUserProfile && <PostsLinks profileId={profile.id} />}
			{children}
		</div>
	);
}
