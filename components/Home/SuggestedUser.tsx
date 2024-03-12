'use client';

import Link from 'next/link';
import classes from './SuggestedUser.module.scss';
import ProfileImage from '../UI/User/ProfileImage';
import { followUser, unFollowUser } from '@/lib/actions/user/followUser';
import { useState } from 'react';
import {
	FOLLOWING,
	NOTFOLLOWING,
	REQUESTED,
} from '@/lib/constants/followingStatus';
import Spinner from '../UI/Spinner';
import { getSuggestedButtonMessage } from '@/lib/helpers/getFollowButtonMessage';
import { removeFollower } from '@/lib/actions/user/removeFollower';

interface SuggestedUserProps {
	id: string;
	image: string;
	name: string;
	imageType: string;
	userId: string;
	button?: boolean;
	followersLength?: number;
	followers?: boolean;
	followingStatus?: string;
	isLoggedUser?: boolean;
	isLoggedUserFollowers?: boolean;
}

const SuggestedUser: React.FC<SuggestedUserProps> = (props) => {
	const [followingStatus, setFollowingStatus] = useState(
		props.followingStatus ? props.followingStatus : NOTFOLLOWING
	);
	const [isFollowerRemoved, setIsFollowerRemoved] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const followHandler = async () => {
		setIsLoading(true);

		if (followingStatus === NOTFOLLOWING) {
			const res = await followUser(props.id);
			setFollowingStatus(res.status);
		}

		if (followingStatus === FOLLOWING) {
			const res = await unFollowUser(props.id);
			setFollowingStatus(`${res.status}`);
		}

		setIsLoading(false);
	};
	const removeFollowerHandler = async () => {
		setIsLoading(true);
		const res = await removeFollower(props.id);
		setFollowingStatus(res.status);
		setIsFollowerRemoved(true);
		setIsLoading(false);
	};
	const btnMsg = getSuggestedButtonMessage(followingStatus);
	return (
		<div className={classes.user} key={props.id}>
			<div className={classes.image}>
				<ProfileImage
					userId={props.userId}
					image={props.image}
					imageType={props.imageType}
					name={props.name}
					profileId={props.id.toString()}
					snippet
				/>
				<div className={classes.name}>
					<Link href={`/profile/${props.id}`}>{props.name}</Link>
					<span>suggested for you</span>
					{props.followers ? (
						<span>{props.followersLength} followers</span>
					) : null}
				</div>
			</div>
			{isLoading ? (
				<Spinner />
			) : props.isLoggedUser ? (
				<div></div>
			) : props.isLoggedUserFollowers ? (
				<button
					className={`${classes.follow} ${classes.button} ${classes.gray} ${
						isFollowerRemoved ? classes.removed : null
					}`}
					onClick={removeFollowerHandler}
				>
					{isFollowerRemoved ? 'Removed' : 'Remove'}
				</button>
			) : (
				<button
					className={`${classes.follow} ${
						props.button ? classes.button : null
					} ${followingStatus === REQUESTED ? classes.gray : null}`}
					onClick={followHandler}
				>
					{btnMsg}
				</button>
			)}
		</div>
	);
};

export default SuggestedUser;
