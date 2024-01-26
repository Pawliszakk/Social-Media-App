import classes from './Profile.module.scss';
import ProfileInfo from './ProfileInfo';

interface ProfileProps {
	name: string;
	image: string;
	isPrivate: boolean;
}

const Profile: React.FC<ProfileProps> = ({ name, image, isPrivate }) => {
	return (
		<div className={classes.box}>
			<ProfileInfo name={name} image={image} />

			<hr />

			{isPrivate ? (
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
