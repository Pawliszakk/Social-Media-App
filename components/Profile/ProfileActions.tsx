'use client';
import { useState } from 'react';
import classes from './ProfileActions.module.scss';
import Link from 'next/link';
import Spinner from '../UI/Spinner';
import Counters from './Counters';
import ProfileSettings from './ProfileSettings';
import {
	BLOCKING,
	FOLLOWING,
	NOTFOLLOWING,
	REQUESTED,
} from '@/lib/constants/followingStatus';
import { getProfileActionsButtonMessage } from '@/lib/helpers/getFollowButtonMessage';
import { followUser, unFollowUser } from '@/lib/actions/user/followUser';
import { unBlockUser } from '@/lib/actions/user/blockUser';
interface ProfileActionsProps {
	profileId: string;
	userId: string;
	name: string;
	isLoggedUserProfile: boolean;
	isUserFollowingProfile: boolean;
	isBlocked: boolean;
	isCloseFriend: boolean;
	isPrivate: boolean;
	postsLength: number;
	followersLength: number;
	followingLength: number;
	followingStatus: any;
	deleteFollowRequest: () => any;
}

const ProfileActions: React.FC<ProfileActionsProps> = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [followingStatus, setFollowingStatus] = useState(props.followingStatus);
	const [followers, setFollowers] = useState(props.followersLength);

	const followHandler = async () => {
		setIsLoading(true);
		if (followingStatus === FOLLOWING) {
			let res;
			try {
				res = await unFollowUser(props.profileId);
			} catch (e) {
				setIsLoading(false);
				return;
			}
			if (res.ok) {
				if (res.status === NOTFOLLOWING) {
					setFollowingStatus(NOTFOLLOWING);
					setFollowers((prev) => prev - 1);
				}
			}
		}
		if (followingStatus === NOTFOLLOWING) {
			let res;
			try {
				res = await followUser(props.profileId);
			} catch (e) {
				setIsLoading(false);
				return;
			}
			if (res.ok) {
				if (res.status !== REQUESTED) {
					setFollowingStatus(res.status);
					setFollowers((prev) => prev + 1);
				} else {
					location.reload();
				}
			}
		}
		if (followingStatus === REQUESTED) {
			let res;
			try {
				res = await props.deleteFollowRequest();
			} catch (e) {
				setIsLoading(false);
				return;
			}
			if (res.ok) {
				setFollowingStatus(res.status);
			}
		}
		if (followingStatus === BLOCKING) {
			let res;
			try {
				res = await unBlockUser(props.profileId);
			} catch (e) {
				setIsLoading(false);
				return;
			}
			location.reload();
		}

		setIsLoading(false);
	};
	const btnMsg = getProfileActionsButtonMessage(followingStatus);

	return (
		<>
			<div className={classes.actions}>
				<h2>{props.name}</h2>

				{!props.isLoggedUserProfile && (
					<>
						<button
							className={`${classes.action} ${
								followingStatus === NOTFOLLOWING ? classes.follow : ''
							}`}
							onClick={followHandler}
							disabled={isLoading}
						>
							{isLoading ? <Spinner className={classes.spinner} /> : btnMsg}
						</button>
						<ProfileSettings
							isBlocked={props.isBlocked}
							profileId={props.profileId}
							userId={props.userId}
							isCloseFriend={props.isCloseFriend}
						/>
					</>
				)}

				{props.isLoggedUserProfile && (
					<>
						<Link className={classes.action} href="/settings/edit">
							Edit profile
						</Link>
						<Link className={classes.action} href="/archive">
							View archive
						</Link>
					</>
				)}
			</div>
			<Counters
				userId={props.userId}
				isPrivate={props.isPrivate}
				isUserFollowingProfile={props.isUserFollowingProfile}
				isLoggedUserProfile={props.isLoggedUserProfile}
				isBlocked={props.isBlocked}
				profileId={props.profileId}
				followersLength={followers}
				postsLength={props.postsLength}
				followingLength={props.followingLength}
			/>
		</>
	);
};

export default ProfileActions;
