'use client';
import { useState } from 'react';
import classes from './ProfileActions.module.scss';
import Link from 'next/link';
interface ProfileActionsProps {
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
	const [isFollowing, setIsFollowing] = useState(props.isUserFollowingProfile);
	const [posts, setPosts] = useState(props.postsLength);
	const [followers, setFollowers] = useState(props.followersLength);
	const [following, setFollowing] = useState(props.followingLength);

	const followHandler = async () => {
		if (isFollowing) {
			props.unFollow();
			setIsFollowing(false);
			setFollowers((prev) => prev - 1);
		} else {
			props.follow();
			setIsFollowing(true);
			setFollowers((prev) => prev + 1);
		}
	};

	return (
		<>
			<div className={classes.actions}>
				<h2>{props.name}</h2>

				{!props.isLoggedUserProfile && (
					<>
						<button className={classes.action} onClick={followHandler}>
							{isFollowing ? 'unFollow' : 'follow'}
						</button>
						<button>...</button>
					</>
				)}

				{props.isLoggedUserProfile && (
					<>
						<Link className={classes.action} href="/settings">
							Edit profile
						</Link>
						<Link className={classes.action} href="/archive">
							Edit profile
						</Link>
						<button>...</button>
					</>
				)}
			</div>
			<div className={classes.data}>
				<div>
					<p>
						Posts: <span>{posts}</span>
					</p>
				</div>
				<div>
					<p>
						followers: <span>{followers}</span>
					</p>
				</div>
				<div>
					<p>
						following: <span>{following}</span>
					</p>
				</div>
			</div>
		</>
	);
};

export default ProfileActions;
