'use server';

import {
	FOLLOWING,
	NOTFOLLOWING,
	REQUESTED,
} from '@/lib/constants/followingStatus';
import { User } from '../Models/user';
import { getUserData } from '../utils/getUserData';

export async function getUserFollowers(profileId: string) {
	const { session, user } = await getUserData(
		'following sentFollowRequests',
		'sentFollowRequests'
	);

	let profile;

	try {
		profile = await User.findOne({ _id: profileId })
			.select('followers')
			.populate({
				path: 'followers',
				select: 'name image followers imageType',
			});
	} catch (e) {
		console.log(e);
		throw new Error('Something went wrong, please try again later');
	}

	const followersWithFollowingStatus = profile.followers.map(
		(follower: any) => {
			const isFollowedByUser = !!follower.followers.find(
				(id: string) => id.toString() === user.id.toString()
			);

			const isProfileRequestedToFollow = !!user.sentFollowRequests.find(
				(el: any) => el.reciever.toString() === follower.id.toString()
			);

			let followingStatus;
			if (isFollowedByUser) {
				followingStatus = FOLLOWING;
			}
			if (!isFollowedByUser) {
				followingStatus = NOTFOLLOWING;
			}
			if (isProfileRequestedToFollow) {
				followingStatus = REQUESTED;
			}

			return {
				_id: follower.id,
				name: follower.name,
				image: follower.image,
				imageType: follower.imageType,
				followingStatus,
			};
		}
	);
	const sortedFollowers = followersWithFollowingStatus.sort(
		(followerA: any, followerB: any) => {
			if (followerA._id.toString() === user.id.toString()) {
				return -1;
			}
			if (followerB._id.toString() === user.id.toString()) {
				return 1;
			}
			return 0;
		}
	);

	return sortedFollowers;
}
