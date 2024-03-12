'use client';
import classes from './Counters.module.scss';
import { isCountersClickable } from '@/lib/helpers/isCountersClickable';
import { useState } from 'react';
import UsersList from '../UI/User/UsersList';

interface CountersProps {
	userId: string;
	isUserFollowingProfile: boolean;
	isLoggedUserProfile: boolean;
	isBlocked: boolean;
	isPrivate: boolean;
	profileId: string;
	postsLength: number;
	followersLength: number;
	followingLength: number;
}

const Counters: React.FC<CountersProps> = (props) => {
	const [isFollowersModal, setIsFollowersModal] = useState(false);
	const [isFollowingModal, setIsFollowingModal] = useState(false);

	const handleFollowersModal = () => setIsFollowersModal(true);
	const handleFollowingModal = () => setIsFollowingModal(true);

	const { isFollowersClickable, isFollowingClickable } = isCountersClickable(
		props.followersLength,
		props.followingLength,
		props.isLoggedUserProfile,
		props.isPrivate,
		props.isBlocked,
		props.isUserFollowingProfile
	);

	return (
		<>
			<div className={classes.data}>
				<div>
					<p>
						<span>{props.postsLength}</span>{' '}
						{props.postsLength === 1 ? 'post' : 'posts'}
					</p>
				</div>
				<div
					className={`${classes.counter} ${
						isFollowersClickable ? null : classes.disabled
					}`}
					onClick={handleFollowersModal}
				>
					<p>
						<span>{props.isBlocked ? 0 : props.followersLength}</span> followers
					</p>
				</div>
				<div
					className={`${classes.counter} ${
						isFollowingClickable ? null : classes.disabled
					}`}
					onClick={handleFollowingModal}
				>
					<p>
						<span>{props.isBlocked ? 0 : props.followingLength}</span> following
					</p>
				</div>
			</div>
			{isFollowersModal && (
				<UsersList
					userId={props.userId}
					onClose={() => setIsFollowersModal(false)}
					profileId={props.profileId}
					followers
				/>
			)}
			{isFollowingModal && (
				<UsersList
					userId={props.userId}
					onClose={() => setIsFollowingModal(false)}
					profileId={props.profileId}
				/>
			)}
		</>
	);
};

export default Counters;
