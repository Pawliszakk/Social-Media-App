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

	let buttonMessage;

	switch (followingStatus) {
		case FOLLOWING:
			buttonMessage = 'Following';
			break;
		case NOTFOLLOWING:
			buttonMessage = 'Follow';
			break;
		case REQUESTED:
			buttonMessage = 'Requested';
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
				</div>
			</div>
			<div className={classes.button}>
				{isLoading ? (
					<Spinner />
				) : (
					<button onClick={followHandler}>{buttonMessage}</button>
				)}
			</div>
		</div>
	);
};

export default SuggestedUser;
