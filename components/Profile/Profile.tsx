import classes from './Profile.module.scss';
import ProfileInfo from './ProfileInfo';
import ProfilePost from './ProfilePost';

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
	const isPrivate = user.private;
	return (
		<div className={classes.box}>
			<ProfileInfo
				name={user.name}
				image={user.image}
				posts={user.posts}
				followers={user.followers}
				following={user.following}
			/>

			<hr />

			{isPrivate ? (
				<div>
					<p>
						To konto jest prywatne, zaobserwuj jezeli chcesz wyświetlić zdjęcia
						i filmy
					</p>
				</div>
			) : (
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
			)}
		</div>
	);
};

export default Profile;
