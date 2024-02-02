import { getSessionData } from '@/lib/actions/utils/getSessionData';
import classes from './Profile.module.scss';
import ProfileInfo from './ProfileInfo';
import { CiLock } from 'react-icons/ci';
import PostTile from '../Post/Tile/PostTile';
interface ProfileProps {
	user: {
		id: string;
		name: string;
		image: string;
		private: boolean;
		posts: string[];
		followers: string[];
		following: string[];
	};
}

const Profile: React.FC<ProfileProps> = async ({ user }) => {
	const session = await getSessionData();

	let isPrivate = user.private;

	const isLoggedUserProfile = session.user?.userId === user.id;

	if (isLoggedUserProfile) {
		isPrivate = false;
	}
	return (
		<div className={classes.box}>
			<ProfileInfo
				name={user.name}
				image={user.image}
				posts={user.posts}
				followers={user.followers}
				following={user.following}
			/>

			{isPrivate ? (
				<div className={classes.private}>
					<div className={classes.icon}>
						<CiLock />
					</div>
					<div>
						<p>This Account is Private</p>
						<p>Follow to see their posts.</p>
					</div>
				</div>
			) : (
				<>
					<hr />

					<div className={classes.posts}>
						{user.posts.reverse().map((p: any) => (
							<PostTile
								key={p.id}
								postId={p.id}
								hideLikesCount={p.hideLikesCount}
								archived={p.archived}
								likes={p.likes}
								comments={p.comments}
								image={p.image}
								author={user.name}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Profile;
