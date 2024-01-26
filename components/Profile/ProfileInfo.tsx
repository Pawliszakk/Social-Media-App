import classes from './ProfileInfo.module.scss';
import Image from 'next/image';

interface ProfileInfoProps {
	name: string;
	image: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ name, image }) => {
	return (
		<div className={classes.box}>
			<Image
				src={image}
				width={200}
				height={200}
				alt={`${name} Profile picture`}
			/>

			<div className={classes.info}>
				<div className={classes.actions}>
					<h2>{name}</h2>
					<button>Obserwuj</button>
					<button>...</button>
				</div>

				<div className={classes.data}>
					<div>
						<p>
							Posty: <span>2</span>
						</p>
					</div>
					<div>
						<p>
							Obserwujący: <span>748</span>
						</p>
					</div>
					<div>
						<p>
							Obserwowani: <span>532</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileInfo;
