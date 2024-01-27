import classes from './Profile.module.scss';
import ProfileInfo from './ProfileInfo';

interface ProfileProps {
	user: {
		name: string;
		image: string;
		isPrivate: boolean;
		posts: string[];
		followers: string[];
		following: string[];
	};
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
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

			{user.isPrivate ? (
				<div>
					<p>
						To konto jest prywatne, zaobserwuj jezeli chcesz wyświetlić zdjęcia
						i filmy
					</p>
				</div>
			) : (
				<div>
					<p>Posty</p>
				</div>
			)}
		</div>
	);
};

export default Profile;
