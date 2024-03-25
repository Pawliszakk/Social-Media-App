'use server';

import {
	FOLLOWING,
	NOTFOLLOWING,
	REQUESTED,
} from '@/lib/constants/followingStatus';
import { getUserData } from '../../utils/getUserData';
import { Post } from '../../Models/post';

export async function getPostLikes(postId: string) {
	const { session, user } = await getUserData(
		'following sentFollowRequests',
		'sentFollowRequests'
	);

	let post;
	try {
		post = await Post.findOne({ _id: postId }).select('likes').populate({
			path: 'likes',
			select: 'name image imageType followers',
		});
	} catch (e: any) {
		throw new Error(e);
	}

	const followersWithFollowingStatus = post.likes.map((like: any) => {
		const isFollowedByUser = !!like.followers.find(
			(id: string) => id.toString() === user.id.toString()
		);

		const isProfileRequestedToFollow = !!user.sentFollowRequests.find(
			(el: any) => el.reciever.toString() === like.id.toString()
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
			_id: like.id,
			name: like.name,
			image: like.image,
			imageType: like.imageType,
			followingStatus,
		};
	});

	const sortedFollowing = followersWithFollowingStatus.sort(
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
	return sortedFollowing;
}
