import Spinner from '@/components/UI/Spinner';
import { getProfile } from '@/lib/actions/user/getProfile';
import { Suspense } from 'react';
import classes from './page.module.scss';
import ProfileInfo from '@/components/Profile/ProfileInfo';
import PostTile from '@/components/Post/Tile/PostTile';
import PrivateProfileFallback from '@/components/Profile/PrivateProfileFallback';
import { getSessionData } from '@/lib/actions/utils/getSessionData';
import getLoggedUserProfile from '@/lib/actions/user/getLoggedUserProfile';

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

	// const isProfileUserProfile = profile.id === user!.userId;

	// const isUserFollowingProfile = profile.followers.find(
	// 	(id: string) => id === user!.userId
	// );
	//TO ADD SOON, WHEN FOLLOWING IS SET IN ACTIONS

	return (
		<Suspense fallback={<Spinner />}>
			<div className={classes.box}>
				<ProfileInfo
					name={profile.name}
					image={profile.image}
					posts={profile.posts}
					followers={profile.followers}
					following={profile.following}
				/>

				{profile.private ? (
					<PrivateProfileFallback />
				) : (
					<>
						<hr />

						<div className={classes.posts}>
							{profile.posts.reverse().map((p: any) => {
								return (
									<PostTile
										key={p.id}
										postId={p.id}
										hideLikesCount={p.hideLikesCount}
										archived={p.archived}
										likes={p.likes}
										comments={p.comments}
										image={p.image}
										author={profile.name}
									/>
								);
							})}
						</div>
					</>
				)}
			</div>
		</Suspense>
	);
}
