'use client';
import { useState } from 'react';
import classes from './ProfileActions.module.scss';
import Link from 'next/link';
import Spinner from '../UI/Spinner';
import SettingsButton from '../Post/PostPage/Author/SettingsButton';
import Counters from './Counters';
import ProfileSettings from './ProfileSettings';
interface ProfileActionsProps {
	profileId: string;
	name: string;
	isLoggedUserProfile: boolean;
	isUserFollowingProfile: boolean;
	postsLength: number;
	followersLength: number;
	followingLength: number;
	follow: () => void;
	unFollow: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isFollowing, setIsFollowing] = useState(props.isUserFollowingProfile);
	const [followers, setFollowers] = useState(props.followersLength);

	const followHandler = async () => {
		setIsLoading(true);
		if (isFollowing) {
			await props.unFollow();
			setIsFollowing(false);
			setFollowers((prev) => prev - 1);
		} else {
			await props.follow();
			setIsFollowing(true);
			setFollowers((prev) => prev + 1);
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
								!isFollowing ? classes.follow : ''
							}`}
							onClick={followHandler}
							disabled={isLoading}
						>
							{isLoading ? (
								<Spinner className={classes.spinner} />
							) : isFollowing ? (
								'Unfollow'
							) : (
								'Follow'
							)}
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
