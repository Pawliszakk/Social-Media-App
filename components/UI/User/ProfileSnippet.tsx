import Link from 'next/link';
import ProfileImage from './ProfileImage';
import classes from './ProfileSnippet.module.scss';
import Image from 'next/image';

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
	const { user, profileId } = props;

	return (
		<div className={classes.box}>
			<div className={classes.user}>
				<ProfileImage
					profileId={profileId}
					image={user.image}
					imageType={user.imageType}
					name={user.name}
				/>
				<Link href={`/profile/${profileId}`} className={classes.name}>
					{user.name}
				</Link>
			</div>
			<div className={classes.counters}>
				<div className={classes.counter}>
					<span className={classes.number}>{user.postsLength}</span>
					<span>posts</span>
				</div>
				<div className={classes.counter}>
					<span className={classes.number}>{user.followersLength}</span>
					<span>followers</span>
				</div>
				<div className={classes.counter}>
					<span className={classes.number}>{user.followingLength}</span>
					<span>following</span>
				</div>
			</div>
			<div className={classes.posts}>
				{user.latestPosts.map((post: { image: string; id: string }) => (
					<Link href={`/post/${post.id}`} key={post.id}>
						<Image
							src={`https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${post.image}`}
							width={120}
							height={120}
							alt={`${user.name} post`}
						/>
					</Link>
				))}
			</div>
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
