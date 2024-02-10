import Spinner from '@/components/UI/Spinner';
import { getProfile } from '@/lib/actions/user/getProfile';
import { Suspense } from 'react';
import classes from './page.module.scss';
import ProfileInfo from '@/components/Profile/ProfileInfo';
import PostTile from '@/components/Post/Tile/PostTile';
import PrivateProfileFallback from '@/components/Profile/PrivateProfileFallback';
import { getSessionData } from '@/lib/actions/utils/getSessionData';
import getLoggedUserProfile from '@/lib/actions/user/getLoggedUserProfile';
import {
	FOLLOWING,
	NOTFOLLOWING,
	REQUESTED,
} from '@/lib/constants/followingStatus';

export default async function ProfilePage({
	params,
}: {
	params: { userId: string };
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
				{isLoggedUserProfile || isUserFollowingProfile || !profile.private ? (
					<>
						<hr />

						<div className={classes.posts}>
							{profile.posts.reverse().map((post: any) => (
								<PostTile
									key={post.id}
									postId={post.id}
									hideLikesCount={post.hideLikesCount}
									commenting={post.commenting}
									archived={post.archived}
									likes={post.likes}
									comments={post.comments}
									image={post.image}
									author={profile.name}
								/>
							))}
						</div>
					</>
				) : (
					<PrivateProfileFallback />
				)}
			</div>
		</Suspense>
	);
}
