'use client';

import Link from 'next/link';
import classes from './SuggestedUser.module.scss';
import ProfileImage from '../UI/User/ProfileImage';
import { followUser } from '@/lib/actions/user/followUser';
import { useState } from 'react';
import {
	FOLLOWING,
	NOTFOLLOWING,
	REQUESTED,
} from '@/lib/constants/followingStatus';
import Spinner from '../UI/Spinner';

interface SuggestedUserProps {
	id: string;
	image: string;
	name: string;
	imageType: string;
	userId: string;
	button?: boolean;
	followersLength?: number;
	followers?: boolean;
}

const SuggestedUser: React.FC<SuggestedUserProps> = (props) => {
	const [followingStatus, setFollowingStatus] = useState(NOTFOLLOWING);
	const [isLoading, setIsLoading] = useState(false);
	const followHandler = async () => {
		setIsLoading(true);
		const res = await followUser(props.userId, props.id);
		setFollowingStatus(res.status);
		setIsLoading(false);
	};
	let btnMsg;

	switch (followingStatus) {
		case FOLLOWING:
			btnMsg = 'Following';
			break;
		case NOTFOLLOWING:
			btnMsg = 'Follow';
			break;
		case REQUESTED:
			btnMsg = 'Requested';
			break;
	}

	return (
		<div className={classes.user} key={props.id}>
			<div className={classes.image}>
				<ProfileImage
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
			) : (
				<button
					className={`${classes.follow} ${
						props.button ? classes.button : null
					}`}
					onClick={followHandler}
				>
					{btnMsg}
				</button>
			)}
		</div>
	);
};

export default SuggestedUser;
