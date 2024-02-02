import classes from './Profile.module.scss';
import ProfileInfo from './ProfileInfo';
import ProfilePost from './ProfilePost';
import { CiLock } from 'react-icons/ci';
interface ProfileProps {
	user: {
		name: string;
		image: string;
		private: boolean;
		posts: string[];
		followers: string[];
		following: string[];
	};
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
	const isPrivate = true;
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
						{user.posts.map((p: any) => (
							<ProfilePost
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
