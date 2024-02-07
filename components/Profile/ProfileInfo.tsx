import classes from './ProfileInfo.module.scss';
import Image from 'next/image';

interface ProfileInfoProps {
	name: string;
	image: string;
	posts: string[];
	followers: string[];
	following: string[];
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
	name,
	image,
	posts,
	followers,
	following,
}) => {
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
					<button>Follow</button>
					<button>...</button>
				</div>

				<div className={classes.data}>
					<div>
						<p>
							Posts: <span>{posts.length}</span>
						</p>
					</div>
					<div>
						<p>
							followers: <span>{followers.length}</span>
						</p>
					</div>
					<div>
						<p>
							following: <span>{following.length}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileInfo;
