import Link from 'next/link';
import classes from './ProfileSnippet.module.scss';
import ProfileSnippetData from './ProfileSnippetData';
import { useState } from 'react';
import {
	FOLLOWING,
	NOTFOLLOWING,
	REQUESTED,
} from '@/lib/constants/followingStatus';
import Spinner from '@/components/UI/Spinner';
import { deleteFollowRequest } from '@/lib/actions/user/sendFollowRequest';
import { followUser, unFollowUser } from '@/lib/actions/user/followUser';

interface ProfileSnippetProps {
	userId: string;
	user: {
		name: string;
		image: string;
		imageType: string;
		postsLength: number;
		followersLength: number;
		followingLength: number;
		isRequestedToFollow: boolean;
		isUserAllowedToViewPosts: boolean;
		latestPosts: {
			id: string;
			image: string;
		}[];
	};
	profileId: string | undefined;
	isUserFollowingProfile: boolean | undefined;
	isUserAuthor: boolean | undefined;
}

const ProfileSnippet: React.FC<ProfileSnippetProps> = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [followingStatus, setFollowingStatus] = useState(
		props.isUserFollowingProfile
			? FOLLOWING
			: props.user.isRequestedToFollow
			? REQUESTED
			: NOTFOLLOWING
	);
	//BRAK USER ID PROVIDED
	const followHandler = async () => {
		setIsLoading(true);
		if (followingStatus === FOLLOWING) {
			let res;
			try {
				res = await unFollowUser(`${props.profileId}`);
			} catch (e) {
				setIsLoading(false);
				return;
			}
			if (res.ok) {
				if (res.status === NOTFOLLOWING) {
					setFollowingStatus(NOTFOLLOWING);
				}
			}
		} else if (followingStatus === NOTFOLLOWING) {
			let res;
			try {
				res = await followUser(`${props.profileId}`);
			} catch (e) {
				setIsLoading(false);
				return;
			}
			if (res.ok) {
				if (res.status !== REQUESTED) {
					setFollowingStatus(res.status);
				} else {
					location.reload();
				}
			}
		} else if (followingStatus === REQUESTED) {
			let res;
			try {
				res = await deleteFollowRequest(props.userId, `${props.profileId}`);
			} catch (e) {
				setIsLoading(false);
				return;
			}
			if (res.ok) {
				setFollowingStatus(res.status);
			}
		}
		setIsLoading(false);
	};

	let btnMsg;
	switch (followingStatus) {
		case FOLLOWING:
			btnMsg = 'Unfollow';
			break;
		case NOTFOLLOWING:
			btnMsg = 'Follow';
			break;
		case REQUESTED:
			btnMsg = 'Requested';
			break;
	}

	return (
		<div className={classes.box}>
			<ProfileSnippetData
				user={props.user}
				profileId={props.profileId}
				isUserAllowedToViewPosts={props.user.isUserAllowedToViewPosts}
			/>

			<div className={classes.actions}>
				{props.isUserAuthor ? (
					<Link href="/settings/edit">Edit Profile</Link>
				) : isLoading ? (
					<Spinner />
				) : (
					<button
						className={`${
							followingStatus === NOTFOLLOWING ? classes.cta : null
						}`}
						onClick={followHandler}
					>
						{btnMsg}
					</button>
				)}
			</div>
		</div>
	);
};

export default ProfileSnippet;
