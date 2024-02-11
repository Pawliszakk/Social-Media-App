import ProfileInfo from '@/components/Profile/ProfileInfo';
import Spinner from '@/components/UI/Spinner';
import getLoggedUserProfile from '@/lib/actions/user/getLoggedUserProfile';
import { getProfile } from '@/lib/actions/user/getProfile';
import { getSessionData } from '@/lib/actions/utils/getSessionData';
import {
	FOLLOWING,
	NOTFOLLOWING,
	REQUESTED,
} from '@/lib/constants/followingStatus';
import { Suspense } from 'react';
import classes from './layout.module.scss';
import PostsLinks from '@/components/Profile/Posts/PostsLinks';

export default async function RootLayout({
	children,
	params,
}: {
	params: { userId: string };
	children: React.ReactNode;
}) {
	const { session, user } = await getSessionData();

	const { userId } = params;

	const isLoggedUserProfile = userId === user?.userId;
	let profile: any;

	if (isLoggedUserProfile) {
		if (!session) {
			throw new Error('Authorization failed');
		}

		profile = await getLoggedUserProfile(userId);
	} else {
		profile = await getProfile(userId);
	}
	if (!profile) {
		throw new Error('Sorry, that site is unreachable');
	}
	const isUserFollowingProfile = profile.followers.find(
		(id: string) => user!.userId
	);

	const isProfileRequestedToFollow = user?.sentFollowRequests.find(
		(el: any) => el.reciever.toString() === profile.id
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

	return (
		<Suspense fallback={<Spinner />}>
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
					userId={user?.userId}
					isProfilePrivate={profile.private}
					followingStatus={followingStatus}
				/>
			</div>
			<hr />
			{isLoggedUserProfile && <PostsLinks profileId={profile.id} />}
			{children}
		</Suspense>
	);
}
