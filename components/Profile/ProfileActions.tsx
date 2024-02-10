'use client';
import { useState } from 'react';
import classes from './ProfileActions.module.scss';
import Link from 'next/link';
import Spinner from '../UI/Spinner';
import Counters from './Counters';
import ProfileSettings from './ProfileSettings';
import {
	FOLLOWING,
	NOTFOLLOWING,
	REQUESTED,
} from '@/lib/constants/followingStatus';
interface ProfileActionsProps {
	profileId: string;
	name: string;
	isLoggedUserProfile: boolean;
	isUserFollowingProfile: boolean;
	postsLength: number;
	followersLength: number;
	followingLength: number;
	followingStatus: any;
	follow: () => any;
	unFollow: () => any;
	deleteFollowRequest: () => any;
}

const ProfileActions: React.FC<ProfileActionsProps> = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [followingStatus, setFollowingStatus] = useState(props.followingStatus);
	const [buttonMsg, setButtonMsg] = useState(props.followingStatus);
	const [followers, setFollowers] = useState(props.followersLength);

	const followHandler = async () => {
		setIsLoading(true);
		if (followingStatus === FOLLOWING) {
			let res;
			try {
				res = await props.unFollow();
			} catch (e) {
				setIsLoading(false);
				return;
			}
			if (res.ok) {
				if (res.status === NOTFOLLOWING) {
					setFollowingStatus(NOTFOLLOWING);
					setButtonMsg('Follow');
					setFollowers((prev) => prev - 1);
				}
			}
		} else if (followingStatus === NOTFOLLOWING) {
			let res;
			try {
				res = await props.follow();
			} catch (e) {
				setIsLoading(false);
				return;
			}
			if (res.ok) {
				if (res.status !== REQUESTED) {
					setButtonMsg('Following');
					setFollowingStatus(res.status);
					setFollowers((prev) => prev + 1);
				} else {
					setButtonMsg('Requested');
					setFollowingStatus(res.status);
				}
			}
		} else if (followingStatus === REQUESTED) {
			let res;
			try {
				res = await props.deleteFollowRequest();
			} catch (e) {
				setIsLoading(false);
				return;
			}
			if (res.ok) {
				setButtonMsg('Follow');
				setFollowingStatus(res.status);
			}
		}

		setIsLoading(false);
	};

	return (
		<>
			<div className={classes.actions}>
				<h2>{props.name}</h2>

				{!props.isLoggedUserProfile && (
					<>
						<button
							className={`${classes.action} ${
								followingStatus !== FOLLOWING ? classes.follow : ''
							}`}
							onClick={followHandler}
							disabled={isLoading}
						>
							{isLoading ? <Spinner className={classes.spinner} /> : buttonMsg}
						</button>
						<ProfileSettings profileId={props.profileId} />
					</>
				)}

				{props.isLoggedUserProfile && (
					<>
						<Link className={classes.action} href="/settings">
							Edit profile
						</Link>
						<Link className={classes.action} href="/archive">
							View archive
						</Link>
					</>
				)}
			</div>
			<Counters
				followersLength={followers}
				postsLength={props.postsLength}
				followingLength={props.followingLength}
			/>
		</>
	);
};

export default ProfileActions;
