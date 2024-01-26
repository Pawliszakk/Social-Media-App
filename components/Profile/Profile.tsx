import Image from 'next/image';

import classes from './Profile.module.scss';

interface ProfileProps {
	name: string;
	image: string;
	isPrivate: boolean;
}

const Profile: React.FC<ProfileProps> = ({ name, image, isPrivate }) => {
	return (
		<div className={classes.box}>
			<div>
				<Image
					src={image}
					width={200}
					height={200}
					alt={`${name} Profile picture`}
				/>
				<div>
					<h2>{name}</h2>
					<button>Obserwuj</button>
					<button>...</button>
				</div>
			</div>

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
