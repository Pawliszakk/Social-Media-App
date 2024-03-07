import Link from 'next/link';
import classes from './ProfileSnippet.module.scss';
import ProfileSnippetData from './ProfileSnippetData';
import { useState } from 'react';

interface ProfileSnippetProps {
	user: {
		name: string;
		image: string;
		imageType: string;
		postsLength: number;
		followersLength: number;
		followingLength: number;
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

	return (
		<div className={classes.box}>
			<ProfileSnippetData user={props.user} profileId={props.profileId} />

			<div className={classes.actions}>
				{props.isUserAuthor ? (
					<Link href="/settings/edit">Edit Profile</Link>
				) : props.isUserFollowingProfile ? (
					<button>unfollow</button>
				) : (
					<button className={classes.cta}>Follow</button>
				)}
			</div>
		</div>
	);
};

export default ProfileSnippet;
