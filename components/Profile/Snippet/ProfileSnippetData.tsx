import ProfileImage from '@/components/UI/User/ProfileImage';
import Image from 'next/image';
import EmptyPostsFallback from '../Posts/EmptyPostsFallback';
import Link from 'next/link';
import classes from './ProfileSnippetData.module.scss';
import PrivateProfileFallback from '../Posts/PrivateProfileFallback';

interface ProfileSnippetDataProps {
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
	isUserAllowedToViewPosts: boolean;
}

const ProfileSnippetData: React.FC<ProfileSnippetDataProps> = (props) => {
	const { user, profileId } = props;
	const arePostsEmpty = user.latestPosts.length === 0 || !user.latestPosts;
	return (
		<>
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
				{props.isUserAllowedToViewPosts ? (
					arePostsEmpty ? (
						<EmptyPostsFallback name={user.name} />
					) : (
						user.latestPosts.map((post: { image: string; id: string }) => (
							<Link href={`/post/${post.id}`} key={post.id}>
								<Image
									src={`https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${post.image}`}
									width={120}
									height={120}
									alt={`${user.name} post`}
								/>
							</Link>
						))
					)
				) : (
					<PrivateProfileFallback classname={classes.privateFallback} />
				)}
			</div>
		</>
	);
};

export default ProfileSnippetData;
