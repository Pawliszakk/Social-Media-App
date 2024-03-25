'use server';

import {
	BLOCKING,
	FOLLOWING,
	NOTFOLLOWING,
	REQUESTED,
} from '@/lib/constants/followingStatus';
import { getUserData } from '../getUserData';
import { permanentRedirect } from 'next/navigation';
import { getProfile } from '../../user/get/getProfile';
import getLoggedUserProfile from '../../user/get/getLoggedUserProfile';

export async function getProfileData(profileId: string) {
	const { session, user } = await getUserData(
		'blockedUsers sentFollowRequests closeFriends',
		'sentFollowRequests'
	);

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
	const isUserFollowingProfile = !!profile.followers.find(
		(id: string) => user.id
	);
	const isUserBlockingProfile = !!user.blockedUsers.find(
		(id: string) => id.toString() === profileId
	);

	const isUserBlockedByProfile = !!profile.blockedUsers.find(
		(id: string) => id.toString() === user.id
	);

	if (isUserBlockedByProfile && !isLoggedUserProfile) {
		permanentRedirect('/');
	}

	const isProfileRequestedToFollow = !!user.sentFollowRequests.find(
		(el: any) => el.reciever.toString() === profileId
	);

	const isProfileCloseFriend = !!user.closeFriends.find(
		(id: string) => id.toString() === profileId
	);
	let followingStatus;
	if (isUserFollowingProfile) {
		followingStatus = FOLLOWING;
	}
	if (!isUserFollowingProfile) {
		followingStatus = NOTFOLLOWING;
	}
	if (isProfileRequestedToFollow) {
		followingStatus = REQUESTED;
	}
	if (isUserBlockingProfile) {
		followingStatus = BLOCKING;
	}

	return {
		profile,
		isLoggedUserProfile,
		isUserFollowingProfile,
		followingStatus,
		isUserBlockingProfile,
		isProfileCloseFriend,
		userId: user.id,
	};
}
